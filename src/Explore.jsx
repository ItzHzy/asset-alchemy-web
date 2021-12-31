import React, { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import Catalyst from './components/Catalyst'
import Dropdown from './components/Dropdown'

const data = [
    {
        icon: 'smile',
        name: 'Tesla',
        ticker: '$TSLA',
        price: 1068.96,
        change: 1.64,
    },
    {
        icon: 'smile',
        name: 'Google',
        ticker: '$GOOG',
        price: 1068.96,
        change: -1.64,
    },
    {
        icon: 'smile',
        name: 'Tesla',
        ticker: '$TSLA',
        price: 1068.96,
        change: 1.64,
    },
    {
        icon: 'smile',
        name: 'Google',
        ticker: '$GOOG',
        price: 1068.96,
        change: -1.64,
    },
    {
        icon: 'smile',
        name: 'Tesla',
        ticker: '$TSLA',
        price: 1068.96,
        change: 1.64,
    },
    {
        icon: 'smile',
        name: 'Google',
        ticker: '$GOOG',
        price: 1068.96,
        change: -1.64,
    },
    {
        icon: 'smile',
        name: 'Tesla',
        ticker: '$TSLA',
        price: 1068.96,
        change: 1.64,
    },
    {
        icon: 'smile',
        name: 'Google',
        ticker: '$GOOG',
        price: 1068.96,
        change: -1.64,
    },
]

const stories = [
    {
        date: 'Nov 8',
        time: '8:45 PM',
        type: 'fas fa-comments',
        title: 'Elon Musk Quits',
        deltas: [{ ticker: 'TSLA', change: 2.8 }],
    },
    {
        date: 'Mar 31',
        time: '11:04 AM',
        type: 'fas fa-bullhorn',
        title: 'Elon Landed on Mars',
        deltas: [
            { ticker: 'SPACX', change: 7.3 },
            { ticker: 'SPCE', change: -3.0 },
        ],
    },
    {
        date: 'Jul 22, 2019',
        time: '4:54 PM',
        type: 'fas fa-balance-scale',
        title: 'Google broken up into 74 companies',
        deltas: [{ ticker: 'GOOG', change: -5.0 }],
    },
    {
        date: 'Jan 1',
        time: '12:00 PM',
        type: 'fas fa-balance-scale',
        title: 'Social Media Banned in the US',
        deltas: [
            { ticker: 'FB', change: -43.4 },
            { ticker: 'SNAP', change: -87.6 },
            { ticker: 'TWTR', change: -69.9 },
            { ticker: 'MTCH', change: 9.0 },
            { ticker: 'ZNGA', change: 31.0 },
        ],
    },
    {
        date: 'Feb 14',
        time: '9:27 AM',
        type: 'fas fa-file',
        title: 'Tim Cook changes name to Tim Apple',
        deltas: [{ ticker: 'AAPL', change: 1.5 }],
    },
    {
        date: 'Sept 12, 2020',
        time: '1:03 AM',
        type: 'fas fa-money-bill-wave',
        title: 'Nikola surpasses Tesla in Sales',
        deltas: [
            { ticker: 'NKLA', change: 18.3 },
            { ticker: 'TSLA', change: 8.0 },
        ],
    },
]

// TODO : set all margin to be multiples of 10
// TODO: change ticker results to be unscrollable, limited, and vertical
// TODO: remove arrows to scroll through tickers
function Explore() {
    let [searchParams, setSearchParams] = useSearchParams()
    let [timeRange, setTimeRange] = useState('All Time')
    let [sort, setSortBy] = useState('Newest')

    return searchParams.get('q') ? (
        <div className="flex flex-col items-center h-full w-[530px] pt-[10px]">
            <div className="flex justify-between h-[33px] w-[510px] px-[20px]">
                <span className="h5 text-neutral-500">Tickers</span>
            </div>
            <div className="flex w-full h-[145px] py-[10px]">
                {data.map((result) => (
                    <TickerResult
                        logo={result.logo}
                        name={result.name}
                        ticker={result.ticker}
                        price={result.price}
                        change={result.change}
                    />
                ))}
            </div>
            <div className="flex justify-between h-3 w-[510px] px-2">
                <span className="h5 text-neutral-500">Stories</span>
                <div className="flex justify-between h-3 gap-1 min-w-min">
                    <Dropdown
                        current={timeRange}
                        options={[
                            'All Time',
                            'Past Year',
                            'Past Month',
                            'Past Week',
                        ]}
                        setOption={setTimeRange}
                    />
                    <Dropdown
                        current={sort}
                        options={['Newest', 'Top']}
                        setOption={setSortBy}
                    />
                </div>
            </div>
            <div className="flex flex-col items-center h-full w-[510px] pt-[20px]">
                {stories.map((catalyst) => (
                    <Catalyst
                        date={catalyst.date}
                        time={catalyst.time}
                        title={catalyst.title}
                        type={catalyst.type}
                        deltas={catalyst.deltas}
                    />
                ))}
            </div>
        </div>
    ) : (
        <NoResult />
    )
}

function NoResult() {
    return (
        <div className="flex flex-col items-center h-full w-[530px]">
            <i
                className={
                    'fas fa-search text-primary-500 text-[100px] mt-[50px]'
                }
            />
            <span className="h5 text-neutral-500 mt-[50px]">
                Search for tickers, topics, companies and more!
            </span>
        </div>
    )
}

function TickerResult(props) {
    return (
        <div className="flex flex-col items-center h-[135px] min-w-min mr-[10px]">
            <i className="fas fa-square text-neutral-500 text-[64px] mb-[5px]" />
            <div className=" text-body text-neutral-400">{props.ticker}</div>
            <div className=" text-body text-neutral-400">{props.name}</div>
            <div className="flex s2">
                <span className="text-neutral-400 mr-[5px]">
                    {'$' + props.price}
                </span>
                <span
                    className={
                        props.change > 0
                            ? 'text-semantic-success'
                            : 'text-semantic-error'
                    }
                >
                    {props.change > 0
                        ? '+' + props.change + '%'
                        : props.change + '%'}
                </span>
            </div>
        </div>
    )
}

export default Explore
