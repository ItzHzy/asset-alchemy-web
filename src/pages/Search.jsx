import React from 'react'
import { useSearchParams } from 'react-router-dom'
import { withAuthenticationRequired } from '@auth0/auth0-react'
import BasicLayout from '../components/layouts/BasicLayout'
import { useQuery, gql } from '@apollo/client'
import { ClipLoader } from 'react-spinners'
import CompanyResult from '../components/common/CompanyItem'
import Loading from './Loading'

// TODO : set all margin to be multiples of 10

const data = []

const stories = []

const FIND_COMPANIES = gql`
    query Query($query: String) {
        searchCompanies(query: $query) {
            name
            ticker
            logo
            price
            dailyDelta
        }
    }
`

function Search() {
    const [searchParams, setSearchParams] = useSearchParams()
    const { loading, error, data } = useQuery(FIND_COMPANIES, {
        variables: {
            query: searchParams.get('q'),
        },
    })

    if (error) {
        console.log(error)

        return <h1>wtf</h1>
    }

    if (loading) {
        return <Loading />
    }

    function setTimeRange(time) {
        setSearchParams({
            q: searchParams.get('q'),
            range: time,
            sort: searchParams.get('sort'),
        })
    }

    function setSortBy(sort) {
        setSearchParams({
            q: searchParams.get('q'),
            range: searchParams.get('range'),
            sort: sort,
        })
    }

    return searchParams.get('q') ? (
        <BasicLayout>
            <div className="flex flex-col items-center h-full w-[530px] p-[10px] gap-2">
                {data.searchCompanies.map((result) => (
                    <CompanyResult
                        key={result.ticker}
                        logo={result.logo}
                        name={result.name}
                        ticker={result.ticker}
                        price={result.price}
                        dailyDelta={result.dailyDelta}
                    />
                ))}
            </div>
        </BasicLayout>
    ) : (
        <BasicLayout>
            <NoResult />
        </BasicLayout>
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
                Search for tickers and companies!
            </span>
        </div>
    )
}

export default withAuthenticationRequired(Search)
