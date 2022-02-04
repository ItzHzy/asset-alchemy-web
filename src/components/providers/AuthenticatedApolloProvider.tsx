import {
    ApolloClient,
    ApolloProvider,
    createHttpLink,
    InMemoryCache,
} from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import React from 'react'

import { useAuth0 } from '@auth0/auth0-react'

interface AuthenticatedApolloProviderProps {
    children: JSX.Element
}

const AuthenticatedApolloProvider = (
    props: AuthenticatedApolloProviderProps,
) => {
    const { getAccessTokenSilently } = useAuth0()

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
        link: authLink.concat(httpLink),
        cache: new InMemoryCache(),
    })

    return (
        <ApolloProvider client={apolloClient}>{props.children}</ApolloProvider>
    )
}

export default AuthenticatedApolloProvider
