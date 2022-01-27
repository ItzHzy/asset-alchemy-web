import React from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import { useQuery, useMutation, gql } from '@apollo/client'
import IconButton from './IconButton'
import { faHeart as farHeart } from '@fortawesome/free-regular-svg-icons'
import { faHeart as fasHeart } from '@fortawesome/free-solid-svg-icons'
import { round } from 'mathjs'
import { ClipLoader } from 'react-spinners'
import { useNavigate } from 'react-router-dom'

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

function CompanyResult(props) {
    const navigate = useNavigate()
    const auth = useAuth0()
    const isFollowingQuery = useQuery(IS_FOLLOWING, {
        variables: {
            userId: auth.user.sub,
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
        auth.loading
    ) {
        return (
            <div className="flex w-full gap-[15px] px-2">
                <img
                    src={props.logo}
                    className="h-[100px] w-[100px] object-contain rounded cursor-pointer"
                    onClick={() => {
                        navigate(`/explore/company/${props.ticker}`)
                    }}
                />
                <div className="flex flex-col h-[100px] justify-evenly w-content">
                    <span
                        className="text-body text-neutral-400 w-[250px] cursor-pointer"
                        onClick={() => {
                            navigate(`/explore/company/${props.ticker}`)
                        }}
                    >
                        {props.name}
                        {' ($' + props.ticker + ')'}
                    </span>
                    {props.price ? (
                        <span className="text-body text-neutral-400">
                            {'$' + props.price + ' '}
                            <span
                                className={
                                    props.dailyDelta > 0
                                        ? 'text-success'
                                        : 'text-error'
                                }
                            >
                                {round(props.dailyDelta, 2) + '%'}
                            </span>
                        </span>
                    ) : (
                        []
                    )}
                </div>

                <div className="flex items-center justify-center w-full h-100">
                    <ClipLoader color={'#b0a6ff'} />
                </div>
            </div>
        )
    }

    if (
        isFollowingQuery.error ||
        followCompanyMutation.error ||
        unfollowCompanyMutation.error ||
        auth.error
    ) {
        console.log(
            isFollowingQuery.error +
                '\n' +
                followCompanyMutation.error +
                '\n' +
                unfollowCompanyMutation.error +
                '\n' +
                auth.error,
        )
        return <span className="text-error">Error</span>
    }

    return (
        <div className="flex w-full gap-[15px] px-2">
            <img
                src={props.logo}
                className="h-[100px] w-[100px] object-contain rounded cursor-pointer"
                onClick={() => {
                    navigate(`/explore/company/${props.ticker}`)
                }}
            />
            <div className="flex flex-col h-[100px] justify-evenly w-content">
                <span
                    className="text-body text-neutral-400 w-[250px] cursor-pointer"
                    onClick={() => {
                        navigate(`/explore/company/${props.ticker}`)
                    }}
                >
                    {props.name}
                    {' ($' + props.ticker + ')'}
                </span>
                {props.price ? (
                    <span className="text-body text-neutral-400">
                        {'$' + props.price + ' '}
                        <span
                            className={
                                props.dailyDelta > 0
                                    ? 'text-success'
                                    : 'text-error'
                            }
                        >
                            {round(props.dailyDelta, 2) + '%'}
                        </span>
                    </span>
                ) : (
                    []
                )}
            </div>

            <div className="flex items-center justify-center w-full h-100">
                <IconButton
                    type={
                        isFollowingQuery.data.isFollowing
                            ? 'primary'
                            : 'secondary'
                    }
                    primaryIcon={fasHeart}
                    secondaryIcon={farHeart}
                    primaryOnClick={() => {
                        unfollowCompany({
                            variables: {
                                userId: auth.user.sub,
                                ticker: props.ticker,
                            },
                        })
                        isFollowingQuery.refetch()
                    }}
                    secondaryOnClick={() => {
                        followCompany({
                            variables: {
                                userId: auth.user.sub,
                                ticker: props.ticker,
                            },
                        })
                        isFollowingQuery.refetch()
                    }}
                />
            </div>
        </div>
    )
}

export default CompanyResult
