import React from 'react'
import { useNavigate } from 'react-router-dom'
import { TitleBar } from '../components/layouts/BasicLayout'

function NotFound() {
    const navigate = useNavigate()

    return (
        <div className="flex flex-col items-center justify-center w-full h-full">
            <TitleBar />
            <p className="h2 text-neutral-400">Oops, there's nothing here!</p>
            <p className="h4 text-neutral-400">
                Click{' '}
                <span
                    className="cursor-pointer text-link"
                    onClick={() => {
                        navigate('/home')
                    }}
                >
                    here
                </span>{' '}
                to go back to safety.
            </p>
        </div>
    )
}

export default NotFound
