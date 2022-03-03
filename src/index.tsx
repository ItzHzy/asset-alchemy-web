import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App'
import AuthenticatedApolloProvider from './components/providers/AuthenticatedApolloProvider'
import { Auth0Provider } from '@auth0/auth0-react'
import { ErrorBoundary, init } from '@sentry/react'

init({
    dsn: process.env.NODE_ENV == 'production' ? process.env.SENTRY_DSN : '',
})

ReactDOM.render(
    <ErrorBoundary
        showDialog
        onError={(e) => {
            console.log(e)
        }}
    >
        <BrowserRouter>
            <Auth0Provider
                domain={process.env.AUTH0_DOMAIN as string}
                clientId={process.env.AUTH0_CLIENT_ID as string}
                redirectUri={process.env.AUTH0_REDIRECT_URI}
                audience={process.env.AUTH0_API_IDENTIFIER}
                useRefreshTokens={true}
            >
                <AuthenticatedApolloProvider>
                    <App />
                </AuthenticatedApolloProvider>
            </Auth0Provider>
        </BrowserRouter>
    </ErrorBoundary>,
    document.getElementById('root'),
)
