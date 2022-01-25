import { gql, useMutation, useQuery } from '@apollo/client'
import { useAuth0 } from '@auth0/auth0-react'
import React from 'react'
import IconButton from './IconButton'
import { faHeart as farHeart } from '@fortawesome/free-regular-svg-icons'
import { faHeart as fasHeart } from '@fortawesome/free-solid-svg-icons'
import { ClipLoader } from 'react-spinners'

const IS_FOLLOWING = gql`
    query IS_FOLLOWING($userId: String, $ticker: String) {
        isFollowing(userId: $userId, ticker: $ticker)
    }
`

const FOLLOW_COMPANY = gql`
    mutation FOLLOW_COMPANY($userId: String, $ticker: String) {
        followCompany(userId: $userId, ticker: $ticker)
    }
`

const UNFOLLOW_COMPANY = gql`
    mutation FOLLOW_COMPANY($userId: String, $ticker: String) {
        unfollowCompany(userId: $userId, ticker: $ticker)
    }
`

function FollowBtn(props) {
    const Auth = useAuth0()
    const isFollowingQuery = useQuery(IS_FOLLOWING, {
        variables: {
            userId: Auth.user.sub,
            ticker: props.ticker,
        },
        fetchPolicy: 'no-cache',
    })

    const [followCompany, followCompanyMutation] = useMutation(FOLLOW_COMPANY)

    const [unfollowCompany, unfollowCompanyMutation] =
        useMutation(UNFOLLOW_COMPANY)

    if (
        isFollowingQuery.loading ||
        followCompanyMutation.loading ||
        unfollowCompanyMutation.loading ||
        Auth.loading
    ) {
        return <ClipLoader color={'#b0a6ff'} />
    }

    if (
        isFollowingQuery.error ||
        followCompanyMutation.error ||
        unfollowCompanyMutation.error ||
        Auth.error
    ) {
        return <span className="text-error">Error</span>
    }
    return (
        <IconButton
            type={isFollowingQuery.data.isFollowing ? 'primary' : 'secondary'}
            primaryIcon={fasHeart}
            secondaryIcon={farHeart}
            size={'xs'}
            primaryOnClick={() => {
                unfollowCompany({
                    variables: {
                        userId: Auth.user.sub,
                        ticker: props.ticker,
                    },
                })
                isFollowingQuery.refetch()
            }}
            secondaryOnClick={() => {
                followCompany({
                    variables: {
                        userId: Auth.user.sub,
                        ticker: props.ticker,
                    },
                })
                isFollowingQuery.refetch()
            }}
        />
    )
}

export default FollowBtn
