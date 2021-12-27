import React from 'react'
import SearchBar from './SearchBar'

//TODO: add ability to read a cookie for name
//TODO: change padding for name
function TitleBar() {
    return (
        <div className="fixed top-0 left-0 flex flex-row justify-between items-center h-[69px] w-full neutral-700 px-[50px]">
            <SearchBar />
            <p className="text-neutral-500 h5">
                Hi,
                <span className="text-primary-500 font-bold">Hamza</span>
            </p>
        </div>
    )
}

export default TitleBar
