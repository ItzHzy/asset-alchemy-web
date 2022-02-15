import React from 'react'

const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
]

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
    const today = new Date() // todays day
    const day = new Date(datetime) // input day

    if (today.toLocaleDateString() == day.toLocaleDateString()) {
        return (today.getHours() - day.getHours()).toString() + 'h'
    }

    if (today.getFullYear != day.getFullYear) {
        return `${months[day.getMonth()]} ${day.getDate()}, ${day.getFullYear}`
    }

    return months[day.getMonth()] + ' ' + day.getDate()
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
