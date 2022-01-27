import {
    ApolloClient,
    ApolloProvider,
    createHttpLink,
    InMemoryCache,
} from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import React from 'react'

import { useAuth0 } from '@auth0/auth0-react'

const AuthenticatedApolloProvider = ({ children }) => {
    const { getAccessTokenSilently } = useAuth0()

    const enchancedFetch = async (url, init) => {
        const token = await getAccessTokenSilently()
        return fetch(url, {
            ...init,
            headers: {
                ...init.headers,
                'Access-Control-Allow-Origin': '*',
                ...(token && { authorization: `Bearer ${token}` }),
            },
        }).then((response) => response)
    }

    const httpLink = createHttpLink({
        uri: process.env.API_SERVER_URL,
        fetchOptions: {
            mode: 'cors',
        },
        fetch: enchancedFetch,
    })

    // const authLink = setContext(async () => {
    //     const token =

    //     return {
    //         headers: {
    //             authorization: `Bearer ${token}`,
    //         },
    //     }
    // })

    const apolloClient = new ApolloClient({
        link: httpLink,
        cache: new InMemoryCache(),
    })

    return <ApolloProvider client={apolloClient}>{children}</ApolloProvider>
}

export default AuthenticatedApolloProvider
