import React from 'react'
import { ClipLoader } from 'react-spinners'
import BasicLayout from '../components/layouts/BasicLayout'

function Loading() {
    return (
        <BasicLayout>
            <div className="flex flex-col items-center h-full w-[530px] pt-[200px]">
                <ClipLoader color={'#b0a6ff'} />
            </div>
        </BasicLayout>
    )
}

export default Loading
