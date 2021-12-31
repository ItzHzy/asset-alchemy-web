import React, { useState } from 'react'

//FIXME: dropdowns aren't vertically centered in their div
function Dropdown(props) {
    const [open, setState] = useState(false)

    console.log(props.options)
    return (
        <div className="flex flex-col gap-1 ">
            <div
                className={
                    'flex items-center px-1 h-2 min-w-[90px] rounded bg-neutral-700 hover:cursor-pointer justify-between' +
                    (open ? ' border-[1px] border-neutral-600' : '')
                }
                onClick={() => (open ? setState(false) : setState(true))}
            >
                <span className="text-neutral-400 text-body mr-05">
                    {props.current}
                </span>
                <i
                    className={
                        (open ? 'fas fa-caret-up' : 'fas fa-caret-down') +
                        ' text-[20px] text-neutral-400'
                    }
                />
            </div>
            <div
                className={
                    'relative flex flex-col px-10 z-10 min-w-min min-h-min bg-neutral-700 gap-05 p-05 rounded hover:cursor-pointer items-left' +
                    (open ? '' : ' hidden')
                }
            >
                {props.options.map((option) => (
                    <Option
                        label={option}
                        setState={setState}
                        setOption={props.setOption}
                    />
                ))}
            </div>
            <div
                className={
                    'absolute top-0 left-0 w-screen h-screen z-5' +
                    (open ? '' : ' hidden')
                }
                onClick={() => setState(false)}
            ></div>
        </div>
    )
}

function Option(props) {
    return (
        <div
            className="flex items-center rounded min-w-min min-h-min text-body text-neutral-200 hover:bg-neutral-800 pl-05 p-05"
            onClick={() => {
                props.setOption(props.label)
                props.setState(false)
            }}
        >
            {props.label}
        </div>
    )
}

export default Dropdown
