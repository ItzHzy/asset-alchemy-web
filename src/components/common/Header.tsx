import React from 'react'
import { createDelta, formatPrice } from '../../helpers/format'
import FollowBtn from './FollowBtn'

interface HeaderProps {
    logo: string
    name: string
    ticker: string
    price: number
    dailyDelta: string
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
                <div className="h5 text-neutral-400">
                    {formatPrice(props.price) + ' '}
                    {createDelta(props.dailyDelta)}
                </div>
            </div>
        </div>
    )
}

export default Header
