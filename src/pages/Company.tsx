import { gql, useQuery } from '@apollo/client'
import { withAuthenticationRequired } from '@auth0/auth0-react'
import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import FollowBtn from '../components/common/FollowBtn'
import NewsItem from '../components/common/NewsItem'
import PriceChart from '../components/common/PriceChart'
import ExtendedLayout from '../components/layouts/ExtendedLayout'
import Loading from './Loading'

interface NewsItemProps {
    datetime: string
    headline: string
    related: Array<{ ticker: string; dailyDelta: number }>
    sourceURL: string
}

const GET_COMPANY = gql`
    query GET_COMPANY($ticker: String) {
        getCompanyInfo(ticker: $ticker) {
            logo
            name
            description
            ticker
            price
            dailyDelta
            reportingDates
            revenue
            netIncome
            grossProfit
            operatingIncome
        }
        getHistoricalPrices(ticker: $ticker, range: "1y", interval: 3)
        getNews(ticker: $ticker) {
            datetime
            headline
            related {
                ticker
                dailyDelta
            }
            sourceURL
        }
    }
`

function Company() {
    const pathParams = useParams()
    const [currentSection, changeSection] = useState(0)
    const [currentSubsection, changeSubsection] = useState(0) // 0: Most Recent Financials
    const getCompanyQuery = useQuery(GET_COMPANY, {
        variables: {
            ticker: pathParams.ticker,
        },
    })

    if (getCompanyQuery.loading) {
        return <Loading />
    }

    if (getCompanyQuery.error) {
        console.log(JSON.stringify(getCompanyQuery.error))
    }

    const {
        logo,
        name,
        ticker,
        price,
        dailyDelta,
        reportingDates,
        revenue,
        netIncome,
        operatingIncome,
        grossProfit,
        description,
    } = getCompanyQuery.data.getCompanyInfo

    const prices = getCompanyQuery.data.getHistoricalPrices

    const news = getCompanyQuery.data.getNews

    if (currentSection == 0) {
        return (
            <ExtendedLayout>
                <div className="flex flex-col w-full gap-2">
                    <Header
                        logo={logo}
                        name={name}
                        ticker={ticker}
                        price={price}
                        dailyDelta={dailyDelta}
                    />
                    <TabSelector
                        current={currentSection}
                        tabs={['Overview', 'Financials', 'About']}
                        onClick={changeSection}
                    />

                    <PriceChart height={330} width={670} data={prices} />
                    <div className="flex flex-col items-center gap-1">
                        {news.length != 0 ? (
                            news.map((result: NewsItemProps) => (
                                <NewsItem
                                    key={result.headline}
                                    time={new Date(
                                        result.datetime,
                                    ).toLocaleDateString()}
                                    day={new Date(
                                        result.datetime,
                                    ).toLocaleTimeString()}
                                    related={result.related}
                                    headline={result.headline}
                                    sourceURL={result.sourceURL}
                                />
                            ))
                        ) : (
                            <div className="flex justify-center w-full h5 text-neutral-400">
                                No news for this symbol.
                            </div>
                        )}
                    </div>
                </div>
            </ExtendedLayout>
        )
    }

    if (currentSection == 1) {
        return (
            <ExtendedLayout>
                <div className="flex flex-col w-full gap-2">
                    <Header
                        logo={logo}
                        name={name}
                        ticker={ticker}
                        price={price}
                        dailyDelta={dailyDelta}
                    />
                    <TabSelector
                        current={currentSection}
                        tabs={['Overview', 'Financials', 'About']}
                        onClick={changeSection}
                    />
                    <PriceChart height={330} width={670} data={prices} />
                    {reportingDates.length != 0 ? (
                        <div className="flex flex-col gap-1">
                            <TabSelector
                                current={currentSubsection}
                                tabs={reportingDates}
                                onClick={changeSubsection}
                            />
                            <Financials
                                revenue={revenue[currentSubsection]}
                                netIncome={netIncome[currentSubsection]}
                                operatingIncome={
                                    operatingIncome[currentSubsection]
                                }
                                grossProfit={grossProfit[currentSubsection]}
                            />
                        </div>
                    ) : (
                        <div className="flex justify-center w-full h5 text-neutral-400">
                            This company does not report financials under this
                            symbol.
                        </div>
                    )}
                </div>
            </ExtendedLayout>
        )
    }

    if (currentSection == 2) {
        return (
            <ExtendedLayout>
                <div className="flex flex-col w-full gap-2">
                    <Header
                        logo={logo}
                        name={name}
                        ticker={ticker}
                        price={price}
                        dailyDelta={dailyDelta}
                    />
                    <TabSelector
                        current={currentSection}
                        tabs={['Overview', 'Financials', 'About']}
                        onClick={changeSection}
                    />
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
            </ExtendedLayout>
        )
    }

    return <div></div>
}

interface HeaderProps {
    logo: string
    name: string
    ticker: string
    price: number
    dailyDelta: number
}

function Header(props: HeaderProps) {
    return (
        <div className="flex flex-row items-center w-full gap-2 h-180 pl-30">
            <img
                className="h-[128px] w-[128px] object-contain rounded"
                src={props.logo}
            />
            <div className="flex flex-col justify-around h-[128px] w-full">
                <div className="flex flex-row items-center justify-between text-neutral-400">
                    <span className="h4">{`${props.name} ($${props.ticker})`}</span>
                    <FollowBtn ticker={props.ticker} />
                </div>
                <div className="h5 text-neutral-400">{`$${props.price} ${
                    props.dailyDelta > 0 ? '+' : ''
                }${props.dailyDelta}%`}</div>
            </div>
        </div>
    )
}

interface FinancialsProps {
    revenue: string
    operatingIncome: string
    netIncome: string
    grossProfit: string
}

function Financials(props: FinancialsProps) {
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

interface TabSelectorProps {
    current: number
    tabs: Array<string>
    onClick: Function
}

function TabSelector(props: TabSelectorProps) {
    return (
        <div className="flex justify-between w-full h-4 px-1 border-b-2 border-neutral-500">
            {props.tabs.map((label: string, index: number) => (
                <Tab
                    key={label}
                    value={index}
                    current={props.current}
                    label={label}
                    onClick={props.onClick}
                />
            ))}
        </div>
    )
}

interface TabProps {
    current: number
    value: number
    onClick: Function
    label: string
}

function Tab(props: TabProps) {
    const styles =
        props.current == props.value
            ? 'flex items-center h5 text-neutral-400 border-b-4 border-primary-400 hover:cursor-pointer'
            : 'flex items-center h5 text-neutral-500 hover:cursor-pointer'
    return (
        <div
            className={styles}
            onClick={() => {
                props.onClick(props.value)
            }}
        >
            {props.label}
        </div>
    )
}

export default withAuthenticationRequired(Company)
