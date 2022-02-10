import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { round } from 'mathjs'
import React from 'react'
import { faTwitter as fabTwitter } from '@fortawesome/free-brands-svg-icons'
import { faNewspaper as fasNewspaper } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from 'react-router-dom'

export interface NewsItemProps {
    time: string
    day: string
    headline: string
    related: Array<{ ticker: string; dailyDelta: number }>
    sourceURL: string
}

function NewsItem(props: NewsItemProps) {
    return (
        <div className="flex w-[600px] min-h-[85px] h-auto bg-neutral-700 rounded">
            <div className="flex justify-center items-start pt-[5px] h-full w-[45px]">
                <div className="h-[16px] w-[16px]">
                    <FontAwesomeIcon
                        icon={fasNewspaper}
                        className="text-primary-500"
                    />
                </div>
            </div>
            <div className="flex flex-col pt-[5px] h-full w-[555px]">
                <div className="flex justify-between items-center w-full h-[20px] pr-[10px]">
                    <p className="s2 text-neutral-400">
                        {props.time + ' • ' + props.day}
                    </p>
                </div>
                <span
                    className="w-full min-h-min h6 text-neutral-300 hover:cursor-pointer"
                    onClick={() => {
                        window.open(props.sourceURL)
                    }}
                >
                    {props.headline}
                </span>
                <div className="flex flex-row flex-wrap w-full pt-05 pb-05 min-h-min">
                    {props.related.map((result) => (
                        <Delta
                            key={props.time + result.ticker}
                            ticker={result.ticker}
                            dailyDelta={
                                result.dailyDelta
                                    ? round(result.dailyDelta, 2)
                                    : 0.0
                            }
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}

interface DeltaProps {
    ticker: string
    dailyDelta: number
}

function Delta(props: DeltaProps) {
    const navigate = useNavigate()
    return (
        <div
            className={
                'flex items-center h-[20px] min-w-min rounded-[5px] px-[5px] mr-[12px] mb-[6px] hover:cursor-pointer ' +
                (props.dailyDelta > 0 ? 'bg-success' : 'bg-error')
            }
            onClick={() => {
                navigate(`/explore/company/${props.ticker}`)
            }}
        >
            <span
                className={
                    'leading-none ' +
                    (props.dailyDelta > 0
                        ? 'text-neutral-800'
                        : 'text-neutral-200')
                }
            >
                {props.ticker + ' ' + props.dailyDelta + '%'}
            </span>
        </div>
    )
}

export default NewsItem
