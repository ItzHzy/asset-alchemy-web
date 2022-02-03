import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Search from './pages/Search'
import Following from './pages/Following'
import Company from './pages/Company'

function App() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/explore/search" element={<Search />} />
            <Route path="/explore/company/:ticker" element={<Company />} />
            <Route path="following" element={<Following />} />
        </Routes>
    )
}

export default App
