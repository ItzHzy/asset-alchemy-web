import React from 'react'
import { ClipLoader } from 'react-spinners'
import BasicLayout, { TitleBar } from '../layouts/BasicLayout'

function Loading() {
    return (
        <>
            <TitleBar />
            <div className="flex flex-col items-center h-full w-full pt-[200px]">
                <ClipLoader color="#ffad5c" />
            </div>
        </>
    )
}

export default Loading
