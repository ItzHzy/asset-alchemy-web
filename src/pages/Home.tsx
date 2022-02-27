import React from 'react'
import BasicLayout from '../components/layouts/BasicLayout'
import { useAuth0, withAuthenticationRequired } from '@auth0/auth0-react'
import { gql, useQuery } from '@apollo/client'
import NewsItem, { NewsItemProps } from '../components/common/NewsItem'
import Loading from '../components/common/Loading'

const GET_FEED = gql`
    query GET_FEED($userId: String) {
        getFeed(userId: $userId) {
            datetime
            headline
            related {
                ticker
                dailyDelta
            }
            sourceURL
            summary
            source
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

    const stories = new Set()

    return (
        <BasicLayout>
            <div className="flex flex-col pb-3 shadow-inner pt-[15px]">
                <div className="flex flex-col gap-1">
                    {[...GetFeedQuery.data.getFeed]
                        .filter((result: NewsItemProps) => {
                            if (!stories.has(result.datetime)) {
                                stories.add(result.datetime)
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
                                key={result.datetime}
                                datetime={result.datetime}
                                related={result.related}
                                headline={result.headline}
                                sourceURL={result.sourceURL}
                                source={result.source}
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

export default Home
