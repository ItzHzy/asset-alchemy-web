import React from 'react'

interface TextButtonProps {
    type: 'primary' | 'secondary'
    label: string
}

function TextButton(props: TextButtonProps) {
    if (props.type == 'primary') {
        return (
            <div className="flex py-[8px] px-[12px] rounded-[100px] bg-primary-700">
                <span className="text-button text-neutral-200">
                    {props.label}
                </span>
            </div>
        )
    }

    return <div></div>
}

export default TextButton