import React from 'react'
import { Link } from 'react-router-dom'

// TODO: generalize width and height in figma and in code
// TODO: set exact margins and layout in figma
function Nav() {
    return (
        <div className="flex flex-col justify-between pl-[20px] pt-[15px] pb-[15px] h-[222px] w-[181px] mr-[10px]">
            <Tab path="/" icon="fas fa-home" label="Home" current={true} />
            <Tab
                path="/explore"
                icon="fas fa-globe"
                label="Explore"
                current={false}
            />
            <Tab
                path="/following"
                icon="fas fa-bell"
                label="Following"
                current={false}
            />
            <Tab
                path="/calendar"
                icon="fas fa-calendar-alt"
                label="Calendar"
                current={false}
            />
            <Tab
                path="/settings"
                icon="fas fa-cog"
                label="Settings"
                current={false}
            />
        </div>
    )
}

function Tab(props) {
    const iconStyles =
        props.icon +
        ' text-[25px] ' +
        (props.current ? 'text-primary-500' : 'text-neutral-400')

    const labelStyles =
        'ml-[9px] h5 leading-none ' +
        (props.current ? 'text-primary-500' : 'text-neutral-400')

    return (
        <Link to={props.path} className="flex items-center min-w-min min-h-min">
            <div className="flex items-center justify-center h-[25px] w-[25px]">
                <i className={iconStyles} />
            </div>

            <span className={labelStyles}>{props.label}</span>
        </Link>
    )
}

export default Nav
