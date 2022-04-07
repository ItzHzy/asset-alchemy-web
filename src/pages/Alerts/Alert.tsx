import { gql, useLazyQuery, useMutation, useQuery } from '@apollo/client'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash as fasTrash } from '@fortawesome/free-solid-svg-icons'
import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Dropdown from '../../components/common/Dropdown'
import Loading from '../../components/common/Loading'
import BasicLayout from '../../components/layouts/BasicLayout'
import {
    reverseMetrics,
    metrics,
    conditionsList,
    reverseOperators,
    operators,
} from '../../helpers/lookupMetrics'

const GET_COMPANY_NAME = gql`
    query GET_COMPANY_NAME_QUERY($query: String) {
        searchCompanies(query: $query) {
            ticker
            name
        }
    }
`

const GET_ALERT = gql`
    query GET_ALERT($alertId: String) {
        getAlert(alertId: $alertId) {
            name
            alertId
            symbol {
                ticker
                name
            }
            methods
            conditions
        }
    }
`

const CREATE_ALERT = gql`
    mutation CREATE_ALERT(
        $ruleName: String
        $symbol: String
        $methods: JSON
        $conditions: [[Any]]
    ) {
        createAlert(
            ruleName: $ruleName
            symbol: $symbol
            methods: $methods
            conditions: $conditions
        )
    }
`

const UPDATE_ALERT = gql`
    mutation UPDATE_ALERT(
        $alertId: String
        $ruleName: String
        $symbol: String
        $methods: JSON
        $conditions: [[Any]]
    ) {
        updateAlert(
            alertId: $alertId
            ruleName: $ruleName
            symbol: $symbol
            methods: $methods
            conditions: $conditions
        )
    }
`

function Alert() {
    const navigate = useNavigate()
    const pathParams = useParams()
    const alertId = (pathParams as any).alertId

    const [getCompanyName, getCompanyNameQuery] = useLazyQuery(GET_COMPANY_NAME)

    const getAlertQuery = useQuery(GET_ALERT, {
        variables: {
            alertId: alertId,
        },
        fetchPolicy: 'no-cache',
    })

    const [createAlert, createAlertMutation] = useMutation(CREATE_ALERT, {
        onCompleted: () => {
            navigate('/alerts')
        },
    })

    const [updateAlert, updateAlertMutation] = useMutation(UPDATE_ALERT, {
        onCompleted: () => {
            navigate('/alerts')
        },
    })

    const [conditions, updateConditions]: [any, any] = useState([])

    if (getCompanyNameQuery.loading || getAlertQuery.loading) return <Loading />

    if (getAlertQuery.data.getAlert && conditions.length == 0)
        updateConditions(getAlertQuery.data.getAlert.conditions)

    return (
        <BasicLayout>
            <div className="flex flex-col w-full h-full gap-[20px] items-center">
                <div className="flex w-[650px] h-[85px] justify-between items-center">
                    <input
                        className="bg-transparent outline-none appearance-none h3 placeholder:opacity-50 focus:placeholder:opacity-0 focus:placeholder-none text-neutral-400"
                        placeholder="New Rule"
                        defaultValue={
                            alertId != 'new'
                                ? getAlertQuery.data.getAlert.name
                                : 'New Rule'
                        }
                        id="name"
                    />
                    <p
                        className="font-bold cursor-pointer h5 text-primary-500 text-button "
                        onClick={() => {
                            const name = (
                                document.getElementById(
                                    'name',
                                ) as HTMLInputElement
                            ).value

                            if (
                                !(
                                    name &&
                                    conditions &&
                                    (getCompanyNameQuery.data ||
                                        getAlertQuery.data)
                                )
                            )
                                return

                            const symbol = getCompanyNameQuery.data
                                ? getCompanyNameQuery.data.searchCompanies[0]
                                      .ticker
                                : getAlertQuery.data.getAlert.symbol.ticker

                            alertId != 'new'
                                ? updateAlert({
                                      variables: {
                                          alertId: alertId,
                                          ruleName: name,
                                          symbol: symbol,
                                          methods: { email: true },
                                          conditions: conditions,
                                      },
                                  })
                                : createAlert({
                                      variables: {
                                          ruleName: name,
                                          symbol: symbol,
                                          methods: { email: true },
                                          conditions: conditions,
                                      },
                                  })
                        }}
                    >
                        Save
                    </p>
                </div>

                <div className="flex w-[650px] h-[45px] gap-[10px] items-center">
                    <input
                        className="rounded outline-none bg-neutral-600 text-body h-[45px] text-neutral-400 px-[15px]"
                        placeholder="Symbol"
                        defaultValue={
                            getAlertQuery.data.getAlert
                                ? getAlertQuery.data.getAlert.symbol.ticker
                                : ''
                        }
                        onKeyPress={(e: any) => {
                            if (e.key === 'Enter' && e.target.value) {
                                getCompanyName({
                                    variables: {
                                        query: e.target.value,
                                    },
                                })
                            }
                        }}
                    />
                    <p className="h6 text-neutral-400">
                        {getCompanyNameQuery.data
                            ? getCompanyNameQuery.data.searchCompanies[0].name
                            : getAlertQuery.data.getAlert
                            ? getAlertQuery.data.getAlert.symbol.name
                            : 'Symbol Not Found'}
                    </p>
                </div>
                <div className="flex flex-col w-[650px] h-min gap-[10px]">
                    <p className="h5 text-neutral-400">Conditions</p>
                    {conditions.map((condition: any[], index: number) => (
                        <Condition
                            key={index.toString() + condition[0]}
                            metric={condition[0]}
                            operator={condition[1]}
                            value={condition[2]}
                            index={index}
                            conditions={conditions}
                            updateConditions={updateConditions}
                        />
                    ))}
                    <p
                        className="mt-[10px] cursor-pointer h5 text-bold text-primary-500 text-button whitespace-nowrap w-min pl-[10px]"
                        onClick={() => {
                            updateConditions([
                                ...conditions,
                                ['changePercent', '>', 5],
                            ])
                        }}
                    >
                        Add Condition
                    </p>
                </div>
            </div>
        </BasicLayout>
    )
}

export interface ConditionProps {
    metric: string
    operator: string
    value: string | number | boolean
    index: number
    conditions: Array<Array<number | string | boolean>>
    updateConditions: Function
}

function Condition(props: ConditionProps) {
    function changeMetric(arg: string) {
        arg = reverseMetrics[arg]
        const type = metrics[arg].type
        const operator = type == 'number' ? '>' : '=='
        const value = type == 'number' || type == 'string' ? 'we' : 'true'
        const condition = [arg, operator, value]
        const newConditions = [...props.conditions]
        newConditions[props.index] = condition
        props.updateConditions(newConditions)
    }

    const changeOperator = (arg: string) => {
        arg = reverseOperators[arg]
        const condition = [props.metric, arg, props.value]
        const newConditions = [...props.conditions]
        newConditions[props.index] = condition
        props.updateConditions(newConditions)
    }

    const changeValue = (arg: string | number) => {
        if (typeof arg != 'number') {
            arg = reverseOperators[arg]
        }
        const condition = [props.metric, props.operator, arg]
        const newConditions = [...props.conditions]
        newConditions[props.index] = condition
        props.updateConditions(newConditions)
    }

    const deleteCondition = (index: number) => {
        const newConditions = [...props.conditions]
        newConditions.splice(index, 1)
        props.updateConditions(newConditions)
    }

    return (
        <div className="flex h-[40px] w-[650px] justify-between overflow-visible items-center">
            <div className="flex w-[220px] h-[40px]">
                <Dropdown
                    current={metrics[props.metric].label}
                    options={conditionsList.metrics}
                    setOption={(arg: string) => {
                        changeMetric(arg)
                    }}
                />
            </div>

            <div className="flex w-[180px] h-full">
                {
                    (
                        {
                            number: (
                                <Dropdown
                                    current={operators[props.operator]}
                                    options={conditionsList.operators.number}
                                    setOption={(arg: string) => {
                                        changeOperator(arg)
                                    }}
                                />
                            ),
                            boolean: (
                                <Dropdown
                                    current={operators[props.operator]}
                                    options={conditionsList.operators.boolean}
                                    setOption={(arg: string) => {
                                        changeOperator(arg)
                                    }}
                                />
                            ),
                            event: (
                                <Dropdown
                                    current={operators[props.operator]}
                                    options={conditionsList.operators.event}
                                    setOption={(arg: string) => {
                                        changeOperator(arg)
                                    }}
                                />
                            ),
                            string: (
                                <Dropdown
                                    current={operators[props.operator]}
                                    options={conditionsList.operators.string}
                                    setOption={(arg: string) => {
                                        changeOperator(arg)
                                    }}
                                />
                            ),
                        } as any
                    )[metrics[props.metric].type]
                }
            </div>
            <div className="flex w-[100px] h-full">
                {
                    (
                        {
                            number: (
                                <input
                                    type="number"
                                    min={0}
                                    onChange={(e) => {
                                        changeValue(parseInt(e.target.value))
                                    }}
                                    defaultValue={props.value.toString()}
                                    className="rounded outline-none bg-neutral-600 text-body text-neutral-400 px-[15px] w-full h-full"
                                />
                            ),
                            boolean: (
                                <Dropdown
                                    current={operators[props.value.toString()]}
                                    options={conditionsList.values.boolean}
                                    setOption={(arg: string) => {
                                        changeValue(arg)
                                    }}
                                />
                            ),
                            event: (
                                <Dropdown
                                    current={operators[props.value.toString()]}
                                    options={conditionsList.values.event}
                                    setOption={(arg: string) => {
                                        changeValue(arg)
                                    }}
                                />
                            ),
                            string: (
                                <input
                                    onChange={(e) => {
                                        changeValue(e.target.value)
                                    }}
                                    defaultValue={props.value.toString()}
                                    className="rounded outline-none bg-neutral-600 text-body text-neutral-400 px-[15px] w-full h-full"
                                />
                            ),
                        } as any
                    )[metrics[props.metric].type]
                }
            </div>
            <FontAwesomeIcon
                icon={fasTrash}
                size={'2x'}
                className="cursor-pointer text-error"
                onClick={() => {
                    deleteCondition(props.index)
                }}
            />
        </div>
    )
}
export default Alert
