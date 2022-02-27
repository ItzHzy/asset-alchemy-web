import { gql, useQuery } from '@apollo/client'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope as fasEnvelope } from '@fortawesome/free-solid-svg-icons'
import React from 'react'
import Loading from '../../components/common/Loading'
import BasicLayout from '../../components/layouts/BasicLayout'
import { useNavigate } from 'react-router-dom'

const ALERTS = gql`
    query ALERTS {
        listAlerts {
            name
            alertId
            methods
        }
    }
`

function Alerts() {
    const AlertsQuery = useQuery(ALERTS, {
        fetchPolicy: 'no-cache',
    })
    const navigate = useNavigate()

    if (AlertsQuery.loading) return <Loading />

    if (AlertsQuery.error) throw new Error(AlertsQuery.error.toString())

    return (
        <BasicLayout>
            <div className="flex flex-col items-center w-full h-full pt-[50px] gap-[10px]">
                <div className="flex justify-end w-[600px] rounded-[20px] border-primary-500 pr-[20px]">
                    <p
                        className="cursor-pointer h5 text-button text-primary-500"
                        onClick={() => {
                            navigate('/alerts/new')
                        }}
                    >
                        Create Alert
                    </p>
                </div>
                {AlertsQuery.data.listAlerts.map((alert: AlertItemsProps) => (
                    <AlertItem
                        key={alert.alertId}
                        name={alert.name}
                        methods={alert.methods}
                        alertId={alert.alertId}
                    />
                ))}
            </div>
        </BasicLayout>
    )
}

export interface AlertItemsProps {
    name: string
    alertId: string
    methods: { email: boolean }
}

function AlertItem(props: AlertItemsProps) {
    const navigate = useNavigate()

    return (
        <div className="flex h-min w-[600px] items-center rounded-[10px] bg-neutral-700 px-[20px] py-[15px]">
            <div className="flex w-[470px] flex-col gap-[10px]">
                <p
                    className="flex w-full cursor-pointer h-min h4 text-neutral-300"
                    onClick={() => {
                        navigate(`/alerts/${props.alertId}`)
                    }}
                >
                    {props.name}
                </p>
                <div className="flex w-full text-neutral-400 pl-[10px]">
                    {props.methods.email && (
                        <FontAwesomeIcon icon={fasEnvelope} size={'2x'} />
                    )}
                </div>
            </div>
            <div className="flex h-full w-[130px] items-center">
                <p className="ml-auto cursor-pointer text-button text-error">
                    Delete
                </p>
            </div>
        </div>
    )
}

export default Alerts
