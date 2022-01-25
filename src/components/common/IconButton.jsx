import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

function IconButton(props) {
    if (props.type == 'primary') {
        return (
            <button
                className="p-[8px] rounded-full flex bg-primary-700 border-primary-700 h-min border-[2px] active:opacity-60"
                onClick={props.primaryOnClick}
            >
                <FontAwesomeIcon
                    className="text-neutral-300 focus:text-neutral-200"
                    icon={props.primaryIcon}
                    size={props.size}
                />
            </button>
        )
    }
    if (props.type == 'secondary') {
        return (
            <button
                className="p-[8px] rounded-full flex border-primary-700 h-min border-[2px] active:bg-primary-400 active:border-primary-400"
                onClick={props.secondaryOnClick}
            >
                <FontAwesomeIcon
                    className="text-neutral-300 focus:text-neutral-200"
                    icon={props.secondaryIcon}
                    size={props.size}
                />
            </button>
        )
    }
}

export default IconButton
