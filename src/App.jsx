import React from 'react'
import { Helmet } from 'react-helmet'
import { Routes, Route, Link } from 'react-router-dom'
import TitleBar from './components/TitleBar'
import Nav from './components/Nav'
import Feed from './Feed'

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
            <div className="flex justify-center mt-[69px] h-full w-full">
                <Nav />
                <Routes>
                    <Route path="*" element={<Feed />} />
                    <Route path="/" element={<Feed />} />
                </Routes>
                <div className="h-full w-[181px] ml-10px"></div>
            </div>
        </div>
    )
}

export default App
