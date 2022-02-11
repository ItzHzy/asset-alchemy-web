import { gql, useQuery } from '@apollo/client'
import { withAuthenticationRequired } from '@auth0/auth0-react'
import React from 'react'
import { useParams } from 'react-router-dom'
import Header from '../../components/common/Header'
import PriceChart from '../../components/common/PriceChart'
import TabSelector from '../../components/common/TabSelector'
import BasicLayout from '../../components/layouts/BasicLayout'
import Loading from '../../components/common/Loading'

const OVERVIEW = gql`
    query OVERVIEW($ticker: String) {
        getCompanyInfo(ticker: $ticker) {
            logo
            name
            ticker
            price
            dailyDelta
            description
        }
        getHistoricalPrices(ticker: $ticker, range: "1y", interval: 3) {
            date
            close
        }
    }
`

function Overview() {
    const pathParams = useParams()
    const OverviewQuery = useQuery(OVERVIEW, {
        variables: {
            ticker: pathParams.ticker,
        },
    })

    if (OverviewQuery.loading) return <Loading />

    const { logo, name, ticker, price, dailyDelta, description } =
        OverviewQuery.data.getCompanyInfo

    const prices = OverviewQuery.data.getHistoricalPrices

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
                    namedSection="Overview"
                    tabs={['Overview', 'Financials', 'News']}
                    basePath={`/explore/company/${pathParams.ticker}/`}
                />
                <PriceChart height={330} width={670} data={prices} />
                {description != '' ? (
                    <div className="text-body text-neutral-400">
                        {description}
                    </div>
                ) : (
                    <div className="flex justify-center w-full h5 text-neutral-400">
                        This company does not have a description under this
                        symbol.
                    </div>
                )}
            </div>
        </BasicLayout>
    )
}

export default withAuthenticationRequired(Overview)
