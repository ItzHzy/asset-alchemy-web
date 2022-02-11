import { gql, useQuery } from '@apollo/client'
import { useAuth0, withAuthenticationRequired } from '@auth0/auth0-react'
import React from 'react'
import { useParams } from 'react-router-dom'
import Header from '../../components/common/Header'
import NewsItem, { NewsItemProps } from '../../components/common/NewsItem'
import TabSelector from '../../components/common/TabSelector'
import BasicLayout from '../../components/layouts/BasicLayout'
import Loading from '../../components/common/Loading'

const NEWS = gql`
    query NEWS($ticker: String, $userId: String) {
        getCompanyInfo(ticker: $ticker) {
            logo
            name
            ticker
            price
            dailyDelta
        }
        getNews(ticker: $ticker, userId: $userId) {
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

function News() {
    const Auth = useAuth0()
    const pathParams = useParams()
    const NewsQuery = useQuery(NEWS, {
        variables: {
            ticker: pathParams.ticker,
            userId: Auth.user?.sub,
        },
    })

    if (NewsQuery.loading) return <Loading />

    if (NewsQuery.error) console.log(NewsQuery.error)

    const { logo, name, ticker, price, dailyDelta } =
        NewsQuery.data.getCompanyInfo

    const news = NewsQuery.data.getNews

    const stories = new Set()

    return (
        <BasicLayout>
            <div className="flex flex-col items-center w-full gap-2">
                <div className="flex flex-col sticky top-[70px] w-full bg-neutral-800 gap-2 mb-2">
                    <Header
                        logo={logo}
                        name={name}
                        ticker={ticker}
                        price={price}
                        dailyDelta={dailyDelta}
                    />
                    <TabSelector
                        namedSection="News"
                        tabs={['Overview', 'Financials', 'News']}
                        basePath={`/explore/company/${pathParams.ticker}/`}
                    />
                </div>
                <div className="flex flex-col items-center h-full gap-1">
                    {news.length != 0 ? (
                        news
                            .filter((result: NewsItemProps) => {
                                if (!stories.has(result.sourceURL)) {
                                    stories.add(result.sourceURL)
                                    return true
                                }
                                return false
                            })
                            .sort(
                                (a: NewsItemProps, b: NewsItemProps) =>
                                    parseInt(b.datetime) - parseInt(a.datetime),
                            )
                            .map((result: NewsItemProps) => (
                                <NewsItem
                                    key={result.headline}
                                    datetime={result.datetime}
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
        </BasicLayout>
    )
}

export default withAuthenticationRequired(News)
