import {
    ApolloClient,
    ApolloProvider,
    createHttpLink,
    InMemoryCache,
    from,
} from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import { onError } from '@apollo/client/link/error'
import React from 'react'

import { useAuth0 } from '@auth0/auth0-react'

interface AuthenticatedApolloProviderProps {
    children: JSX.Element
}

const AuthenticatedApolloProvider = (
    props: AuthenticatedApolloProviderProps,
) => {
    const { getAccessTokenSilently } = useAuth0()

    const errorLink = onError(({ graphQLErrors, networkError }) => {
        if (graphQLErrors) throw new Error(graphQLErrors.toString())

        if (networkError) throw new Error(networkError.toString())
    })

    const httpLink = createHttpLink({
        uri: process.env.API_SERVER_URL,
    })

    const authLink = setContext(async () => {
        const token = await getAccessTokenSilently()

        return {
            headers: {
                authorization: `Bearer ${token}`,
            },
        }
    })

    const apolloClient = new ApolloClient({
        link: from([authLink.concat(httpLink), errorLink]),
        cache: new InMemoryCache(),
    })

    return (
        <ApolloProvider client={apolloClient}>{props.children}</ApolloProvider>
    )
}

export default AuthenticatedApolloProvider
