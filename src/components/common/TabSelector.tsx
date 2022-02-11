import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'

interface TabSelectorProps {
    namedSection?: string
    param?: string
    basePath: string
    tabs: Array<string>
}

function TabSelector(props: TabSelectorProps) {
    const pathParams = useParams()

    return (
        <div className="flex justify-between w-full h-4 px-1 border-b-2 border-neutral-500">
            {props.tabs.map((label: string) => (
                <Tab
                    key={label}
                    label={label}
                    isCurrent={
                        props.param
                            ? pathParams[props.param] == label.toLowerCase()
                            : props.namedSection == label
                    }
                    link={props.basePath + label.toLowerCase()}
                />
            ))}
        </div>
    )
}

interface TabProps {
    isCurrent: boolean
    label: string
    link: string
}

function Tab(props: TabProps) {
    const navigate = useNavigate()
    const styles = props.isCurrent
        ? 'flex items-center h5 text-neutral-400 border-b-4 border-primary-400 hover:cursor-pointer'
        : 'flex items-center h5 text-neutral-500 hover:cursor-pointer'
    return (
        <div
            className={styles}
            onClick={() => {
                navigate(props.link)
            }}
        >
            {props.label}
        </div>
    )
}

export default TabSelector
