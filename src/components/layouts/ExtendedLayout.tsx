import React from 'react'
import { Navigation, TitleBar } from './BasicLayout'

interface ExtendedLayoutProps {
    children: JSX.Element
}

function ExtendedLayout(props: ExtendedLayoutProps) {
    return (
        <div className="flex w-full h-full">
            <TitleBar />
            <div className="absolute top-[85px] left-[50%] translate-x-[-50%] flex flex-row h-min">
                <Navigation />
                <div className="flex flex-col items-center h-full w-[670px]">
                    {props.children}
                </div>
            </div>
        </div>
    )
}

export default ExtendedLayout
