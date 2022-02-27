import React, { useState } from 'react'

interface DropdownProps {
    current: string
    options: Array<string>
    setOption: Function
}

function Dropdown(props: DropdownProps): JSX.Element {
    const [opened, setState] = useState(false)

    return (
        <div
            className={
                'relative flex  justify-center flex-col gap-1 select-none h-full w-full bg-neutral-700 hover:cursor-pointer group'
            }
            tabIndex={0}
            id="dropdown"
        >
            <div className={'px-1 rounded peer'}>
                <p className={`text-neutral-400 text-body h-full w-full`}>
                    {props.current}
                </p>
                {/* <i
                    className={
                        (opened ? 'fas fa-caret-up' : 'fas fa-caret-down') +
                        ' text-[20px] text-neutral-400'
                    }
                /> */}
            </div>
            <div
                className={
                    'absolute top-[50px] flex-col z-10 w-full max-h-[500px] overflow-y-scroll scrollbar-none bg-neutral-700 gap-05 p-05 rounded hover:cursor-pointer items-left hidden group-focus:visible group-focus:flex'
                }
            >
                {props.options.map((option: string) => (
                    <Option
                        key={option}
                        label={option}
                        setOption={props.setOption}
                    />
                ))}
            </div>
        </div>
    )
}

interface OptionProps {
    label: string
    setOption: Function
}

function Option(props: OptionProps): JSX.Element {
    return (
        <div
            className="relative z-10 flex items-center rounded min-w-min min-h-min text-body text-neutral-200 hover:bg-neutral-800 pl-05 p-05"
            onClick={() => {
                props.setOption(props.label)
                document.getElementById('dropdown')?.blur()
            }}
        >
            {props.label}
        </div>
    )
}

export default Dropdown
