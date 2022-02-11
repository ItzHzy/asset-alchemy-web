import { gql, useQuery } from '@apollo/client'
import { useAuth0, withAuthenticationRequired } from '@auth0/auth0-react'
import React from 'react'
import { Navigate, useParams } from 'react-router-dom'
import Header from '../../components/common/Header'
import TabSelector from '../../components/common/TabSelector'
import BasicLayout from '../../components/layouts/BasicLayout'
import Loading from '../../components/common/Loading'

const FINANCIALS = gql`
    query FINANCIALS($ticker: String) {
        getCompanyInfo(ticker: $ticker) {
            logo
            name
            ticker
            price
            dailyDelta
            reportingDates
            revenue
            netIncome
            grossProfit
            operatingIncome
        }
    }
`

function Financials() {
    const pathParams = useParams()
    const Auth = useAuth0()
    const FinancialsQuery = useQuery(FINANCIALS, {
        variables: {
            ticker: pathParams.ticker,
            userId: Auth.user?.sub,
        },
    })

    if (FinancialsQuery.loading) return <Loading />

    const { logo, name, ticker, price, dailyDelta } =
        FinancialsQuery.data.getCompanyInfo

    const { reportingDates, revenue, netIncome, operatingIncome, grossProfit } =
        FinancialsQuery.data.getCompanyInfo

    if (!pathParams.quarter)
        return (
            <Navigate
                to={`/explore/company/${pathParams.ticker}/financials/${reportingDates[0]}`}
            />
        )

    const quarterMap: any = {}
    if (reportingDates.length > 0) quarterMap[reportingDates[0]] = 0
    if (reportingDates.length > 1) quarterMap[reportingDates[1]] = 1
    if (reportingDates.length > 2) quarterMap[reportingDates[2]] = 2
    if (reportingDates.length > 3) quarterMap[reportingDates[3]] = 3

    const quarterIndex = quarterMap[pathParams.quarter as string]

    return (
        <BasicLayout>
            <div className="flex flex-col items-center w-full gap-2">
                <Header
                    logo={logo}
                    name={name}
                    ticker={ticker}
                    price={price}
                    dailyDelta={dailyDelta}
                />
                <TabSelector
                    namedSection="Financials"
                    tabs={['Overview', 'Financials', 'News']}
                    basePath={`/explore/company/${pathParams.ticker}/`}
                />

                {reportingDates.length != 0 ? (
                    <div className="flex flex-col w-full gap-1">
                        <TabSelector
                            param="quarter"
                            basePath={`/explore/company/${pathParams.ticker}/financials/`}
                            tabs={reportingDates}
                        />
                        <FinancialDetails
                            revenue={revenue[quarterIndex]}
                            netIncome={netIncome[quarterIndex]}
                            operatingIncome={operatingIncome[quarterIndex]}
                            grossProfit={grossProfit[quarterIndex]}
                        />
                    </div>
                ) : (
                    <div className="flex justify-center w-full h5 text-neutral-400">
                        This company does not report financials under this
                        symbol.
                    </div>
                )}
            </div>
        </BasicLayout>
    )
}

interface FinancialsDetailsProps {
    revenue: number
    operatingIncome: number
    netIncome: number
    grossProfit: number
}

function FinancialDetails(props: FinancialsDetailsProps) {
    const style =
        'flex justify-between border-b-2 h6 text-neutral-500 border-neutral-500 h-3 items-center'

    return (
        <div>
            <div className={style}>
                <span>Metric</span>
                <span>(USD)</span>
            </div>
            <div className={style}>
                <span>Revenue</span>
                <span>{props.revenue}</span>
            </div>
            <div className={style}>
                <span>Operating Income</span>
                <span>{props.operatingIncome}</span>
            </div>
            <div className={style}>
                <span>Net Income</span>
                <span>{props.netIncome}</span>
            </div>
            <div className={style}>
                <span>Gross Profit</span>
                <span>{props.grossProfit}</span>
            </div>
        </div>
    )
}

export default Financials
