import React from 'react'
import { Helmet } from 'react-helmet'
import { Routes, Route, Link } from 'react-router-dom'
import TitleBar from './components/TitleBar'
import Home from './Home'

//TODO: remove Helmet dependency and use html template instead
function App() {
    return (
        <div className="h-screen w-screen">
            <Helmet>
                <script
                    src="https://kit.fontawesome.com/ec029e1dde.js"
                    crossorigin="anonymous"
                ></script>
            </Helmet>
            <TitleBar />
            <Routes>
                <Route path="/" element={<Home />} />
            </Routes>
        </div>
    )
}

function Nav() {
    return <div className=""></div>
}

export default App
