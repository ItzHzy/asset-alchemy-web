import React from 'react'

function SearchBar() {
    return (
        <div className="flex flex-row items-center relative top-[50%] left-[50%] -translate-x-1/2 -translate-y-3/4 w-[442px] h-[44px] py-[6px] pl-[15px] pr-[10px] neutral-600 rounded-[100px] space-x-[10px]">
            <i className="fas fa-search text-[25px] text-neutral-400"></i>
            <input
                className="w-full neutral-600 text-neutral-400 text-body outline-none"
                placeholder="Search"
            />
        </div>
    )
}

export default SearchBar
