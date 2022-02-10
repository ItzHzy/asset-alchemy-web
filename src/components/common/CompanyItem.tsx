import React from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import { useQuery, useMutation, gql } from '@apollo/client'
import IconButton from './IconButton'
import { faHeart as farHeart } from '@fortawesome/free-regular-svg-icons'
import { faHeart as fasHeart } from '@fortawesome/free-solid-svg-icons'
import { round } from 'mathjs'
import { ClipLoader } from 'react-spinners'
import { useNavigate } from 'react-router-dom'
import FollowBtn from './FollowBtn'

export interface CompanyItemProps {
    ticker: string
    logo: string
    name: string
    price: number
    dailyDelta: number
}

function CompanyItem(props: CompanyItemProps): JSX.Element {
    const navigate = useNavigate()
    const Auth = useAuth0()

    if (Auth.isLoading) {
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

    if (Auth.error) {
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

                <span className="text-body text-neutral-400">
                    {'$' + props.price + ' '}
                    <span
                        className={
                            props.dailyDelta > 0 ? 'text-success' : 'text-error'
                        }
                    >
                        {round(props.dailyDelta, 2) + '%'}
                    </span>
                </span>
            </div>

            <div className="flex items-center justify-center w-full h-100">
                <FollowBtn ticker={props.ticker} />
            </div>
        </div>
    )
}

export default CompanyItem
