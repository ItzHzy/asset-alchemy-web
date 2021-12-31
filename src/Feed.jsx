import React from 'react'
import Catalyst from './components/Catalyst'

//TODO: remove upcoming widget in design and code
//TODO: fake this data at the backend
const data = [
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

const summary =
    'The Internet Association has fought for tech\'s interests in Washington for the last nine years, lobbying lawmakers to advance the combined interests of Facebook, Amazon, Google, Airbnb, Uber, Twitter, Ebay, Spotify, Zillow and many more of the most recognizable names in tech, from the largest companies on down."Our industry has undergone tremendous growth and change since the Internet Association was formed almost 10 years ago, and in line with this evolution, the Board has made the difficult decision to close the organization at the end of this year," the group wrote in a published statement.'

function Feed() {
    return (
        <div className="relative flex flex-col items-center h-full w-[530px] pt-[20px]">
            {data.map((catalyst) => (
                <Catalyst
                    date={catalyst.date}
                    time={catalyst.time}
                    title={catalyst.title}
                    type={catalyst.type}
                    deltas={catalyst.deltas}
                />
            ))}
        </div>
    )
}

export default Feed
