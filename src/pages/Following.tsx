import React from 'react'
import BasicLayout from '../components/layouts/BasicLayout'
import { gql, useQuery } from '@apollo/client'
import { useAuth0, withAuthenticationRequired } from '@auth0/auth0-react'
import CompanyItem, { CompanyItemProps } from '../components/common/CompanyItem'
import Loading from '../components/common/Loading'

const GET_FOLLOWING = gql`
    query GET_FOLLOWING($userId: String) {
        getFollowing(userId: $userId) {
            name
            ticker
            logo
            price
            dailyDelta
        }
    }
`

function Following() {
    const Auth = useAuth0()

    if (Auth.isLoading) {
        return <Loading />
    }

    const getFollowingQuery = useQuery(GET_FOLLOWING, {
        variables: {
            userId: Auth.user?.sub,
        },
        fetchPolicy: 'network-only',
    })
    if (getFollowingQuery.loading) {
        return <Loading />
    }
    if (getFollowingQuery.error) {
        console.log(JSON.stringify(getFollowingQuery.error))
    }

    return (
        <BasicLayout>
            <div className="flex flex-col items-center h-full w-[680px] p-[10px] gap-2">
                {getFollowingQuery.data.getFollowing.map(
                    (result: CompanyItemProps) => (
                        <CompanyItem
                            key={result.ticker}
                            logo={result.logo}
                            name={result.name}
                            ticker={result.ticker}
                            price={result.price}
                            dailyDelta={result.dailyDelta}
                        />
                    ),
                )}
            </div>
        </BasicLayout>
    )
}

export default Following
