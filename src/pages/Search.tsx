import React from 'react'
import { useSearchParams } from 'react-router-dom'
import { withAuthenticationRequired } from '@auth0/auth0-react'
import BasicLayout from '../components/layouts/BasicLayout'
import { useQuery, gql } from '@apollo/client'
import CompanyResult, {
    CompanyItemProps,
} from '../components/common/CompanyItem'
import Loading from './Loading'

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

    if (loading) {
        return <Loading />
    }

    return searchParams.get('q') ? (
        <BasicLayout>
            <div className="flex flex-col items-center h-full w-[680px] p-[10px] gap-2">
                {data.searchCompanies.map((result: CompanyItemProps) => (
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
