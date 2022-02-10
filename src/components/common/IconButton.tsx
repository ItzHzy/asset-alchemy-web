import React, { MouseEventHandler } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { IconProp, SizeProp } from '@fortawesome/fontawesome-svg-core'

type PrimSec = 'primary' | 'secondary'

interface IconButtonProps {
    type: PrimSec
    size: SizeProp
    primaryIcon: IconProp
    secondaryIcon: IconProp
    primaryOnClick: MouseEventHandler<HTMLButtonElement>
    secondaryOnClick: MouseEventHandler<HTMLButtonElement>
    primaryOutlineStyles?: string
    secondaryOutlineStyles?: string
    primaryIconStyles?: string
    secondaryIconStyles?: string
}

function IconButton(props: IconButtonProps): JSX.Element {
    const primaryOutlineStyles = props.primaryOutlineStyles || ''
    const secondaryOutlineStyles = props.secondaryOutlineStyles || ''
    const primaryIconStyles = props.primaryIconStyles || ''
    const secondaryIconStyles = props.secondaryIconStyles || ''

    const styles = {
        primaryOutlineStyles:
            'p-[8px] rounded-full flex bg-primary-700 border-primary-700 h-min border-[2px] active:opacity-60 ' +
            primaryOutlineStyles,
        secondaryOutlineStyles:
            'p-[8px] rounded-full flex border-primary-700 h-min border-[2px] active:bg-primary-400 active:border-primary-400 ' +
            secondaryOutlineStyles,
        primaryIconStyles:
            'text-neutral-300 focus:text-neutral-200 ' + primaryIconStyles,
        secondaryIconStyles:
            'text-neutral-300 focus:text-neutral-200 ' + secondaryIconStyles,
    }

    return props.type == 'primary' ? (
        <button
            className={styles.primaryOutlineStyles}
            onClick={props.primaryOnClick}
        >
            <FontAwesomeIcon
                className={styles.primaryIconStyles}
                icon={props.primaryIcon}
                size={props.size}
            />
        </button>
    ) : (
        <button
            className={styles.secondaryOutlineStyles}
            onClick={props.secondaryOnClick}
        >
            <FontAwesomeIcon
                className={styles.secondaryIconStyles}
                icon={props.secondaryIcon}
                size={props.size}
            />
        </button>
    )
}

export default IconButton
