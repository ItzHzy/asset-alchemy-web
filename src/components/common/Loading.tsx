import React from 'react'
import { ClipLoader } from 'react-spinners'
import BasicLayout, { TitleBar } from '../layouts/BasicLayout'

function Loading() {
    return (
        <BasicLayout>
            <div className="flex w-full h-full pt-[200px] justify-center">
                <ClipLoader color="#ffad5c" />
            </div>
        </BasicLayout>
    )
}

export default Loading
