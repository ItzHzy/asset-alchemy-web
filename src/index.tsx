import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App'
import AuthenticatedApolloProvider from './components/providers/AuthenticatedApolloProvider'
import { Auth0Provider } from '@auth0/auth0-react'

ReactDOM.render(
    <BrowserRouter>
        <Auth0Provider
            domain={process.env.AUTH0_DOMAIN as string}
            clientId={process.env.AUTH0_CLIENT_ID as string}
            redirectUri={process.env.AUTH0_REDIRECT_URI}
            audience={process.env.AUTH0_API_IDENTIFIER}
        >
            <AuthenticatedApolloProvider>
                <App />
            </AuthenticatedApolloProvider>
        </Auth0Provider>
    </BrowserRouter>,
    document.getElementById('root'),
)
