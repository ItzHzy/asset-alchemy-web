import React from 'react'

// TODO: add icon buttons as a component
// TODO: align catalyst type icons
function Catalyst(props) {
    return (
        <div className="flex w-[450px] min-h-[85px] h-auto bg-neutral-700 mb-[10px] rounded-[5px]">
            <div className="flex justify-center items-start pt-[10px] h-full w-[45px]">
                <div className="h-[16px] w-[16px]">
                    <i
                        className={props.type + ' font-[16px] text-primary-500'}
                    />
                </div>
            </div>
            <div className="flex flex-col pt-[10px] h-full w-[405px]">
                <div className="flex justify-between w-full min-h-min pr-[10px]">
                    <span className="s2 text-neutral-400">
                        {props.time + ' • ' + props.date}
                    </span>
                    <div className="h-[16px] w-[16px]">
                        <i className="fab fa-twitter text-neutral-400 font-[16px]" />
                    </div>
                </div>
                <span className="w-full min-h-min h6 text-neutral-300">
                    {props.title}
                </span>
                <div className="flex flex-row flex-wrap w-full min-h-min">
                    {props.deltas.map((delta) => (
                        <Delta ticker={delta.ticker} change={delta.change} />
                    ))}
                </div>
            </div>
        </div>
    )
}

function Delta(props) {
    return (
        <div
            className={
                'flex items-center h-[20px] min-w-min rounded-[5px] px-[5px] mr-[12px] mb-[6px] ' +
                (props.change > 0 ? 'bg-success' : 'bg-error')
            }
        >
            <span
                className={
                    'leading-none ' +
                    (props.change > 0 ? 'text-neutral-800' : 'text-neutral-200')
                }
            >
                {props.ticker + ' ' + props.change.toString() + '%'}
            </span>
        </div>
    )
}

export default Catalyst
