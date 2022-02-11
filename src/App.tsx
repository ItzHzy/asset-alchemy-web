import React from 'react'
import { Routes, Route, Navigate, useParams } from 'react-router-dom'
import Home from './pages/Home'
import Search from './pages/Search'
import Following from './pages/Following'
import Overview from './pages/Company/Overview'
import Financials from './pages/Company/Financials'
import News from './pages/Company/News'
import { withAuthenticationRequired } from '@auth0/auth0-react'

function App() {
    const pathParams = useParams()

    return (
        <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/explore/search" element={<Search />} />
            <Route
                path="/explore/company/:ticker"
                element={<Navigate to="overview" />}
            />
            <Route
                path="/explore/company/:ticker/overview"
                element={<Overview />}
            />
            <Route
                path="/explore/company/:ticker/financials/:quarter"
                element={<Financials />}
            />
            <Route
                path="/explore/company/:ticker/financials"
                element={<Financials />}
            />
            <Route path="/explore/company/:ticker/news" element={<News />} />
            <Route path="/following" element={<Following />} />
            <Route path="*" element={<Navigate to="/home" />}></Route>
        </Routes>
    )
}

export default withAuthenticationRequired(App)
