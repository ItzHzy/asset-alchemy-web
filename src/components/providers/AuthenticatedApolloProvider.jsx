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

    const httpLink = createHttpLink({
        uri: process.env.API_SERVER_URL, // your URI here...
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

    return <ApolloProvider client={apolloClient}>{children}</ApolloProvider>
}

export default AuthenticatedApolloProvider
