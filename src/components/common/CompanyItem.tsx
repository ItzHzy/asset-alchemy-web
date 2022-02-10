import React from 'react'
import { round } from 'mathjs'
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
                        {parseFloat(props.dailyDelta.toString()).toPrecision(
                            2,
                        ) + '%'}
                    </span>
                </span>
            </div>

            <div className="flex items-center justify-center ml-auto h-100">
                <FollowBtn ticker={props.ticker} />
            </div>
        </div>
    )
}

export default CompanyItem
