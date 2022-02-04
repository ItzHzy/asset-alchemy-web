import React from 'react'
import BasicLayout from '../components/layouts/BasicLayout'
import { useAuth0, withAuthenticationRequired } from '@auth0/auth0-react'
import { gql, useQuery } from '@apollo/client'
import NewsItem from '../components/common/NewsItem'
import Loading from './Loading'

interface NewsItemProps {
    datetime: string
    headline: string
    related: Array<{ ticker: string; dailyDelta: number }>
}

const GET_FEED = gql`
    query GET_FEED($userId: String) {
        getFeed(userId: $userId) {
            datetime
            headline
            related {
                ticker
                dailyDelta
            }
            summary
        }
    }
`

function Home() {
    const Auth = useAuth0()
    const GetFeedQuery = useQuery(GET_FEED, {
        variables: {
            userId: Auth.user?.sub,
        },
    })

    if (GetFeedQuery.loading) return <Loading />

    if (GetFeedQuery.error) {
        console.log(JSON.stringify(GetFeedQuery.error))
        return <p>Error</p>
    }

    return (
        <BasicLayout>
            <div className="flex flex-col pb-3">
                <div className="pb-1 pl-3 h5 text-neutral-400">Recent News</div>
                <div className="flex flex-col gap-1">
                    {GetFeedQuery.data.getFeed.map((result: NewsItemProps) => (
                        <NewsItem
                            key={result.headline}
                            time={new Date(
                                result.datetime,
                            ).toLocaleDateString()}
                            day={new Date(result.datetime).toLocaleTimeString()}
                            related={result.related}
                            headline={result.headline}
                        />
                    ))}
                </div>
                <div className="flex justify-center mt-2 text-neutral-400 h4">
                    You're all caught up 🎉
                </div>
            </div>
        </BasicLayout>
    )
}

export default withAuthenticationRequired(Home)
