import { re } from 'mathjs'
import React from 'react'

export function formatPrice(price: number | string): string {
    return '$' + parseFloat(price.toString()).toFixed(2)
}

export function formatDelta(delta: number | string): string {
    if (!delta) return '+0.0%'
    const sym = parseFloat(delta.toString()) >= 0 ? '+' : ''
    return sym + parseFloat(delta.toString()).toFixed(2) + '%'
}

export function formatDay(datetime: string): string {
    return new Date(datetime).toLocaleDateString()
}

export function formatTime(datetime: string): string {
    return new Date(datetime).toLocaleTimeString()
}

export function createDelta(delta: number | string): JSX.Element {
    const styles =
        parseFloat(delta.toString()) >= 0 ? 'text-success' : 'text-error'

    return (
        <span className={styles}>
            {parseFloat(delta.toString()) >= 0 ? '+' : ''}
            {parseFloat(delta.toString()).toFixed(2)}%
        </span>
    )
}
