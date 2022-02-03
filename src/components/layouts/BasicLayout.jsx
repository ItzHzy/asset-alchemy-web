import { useAuth0 } from '@auth0/auth0-react'
import React, { useState } from 'react'
import {
    Link,
    useSearchParams,
    useNavigate,
    useLocation,
} from 'react-router-dom'
import Logo from '../../assets/logo.svg'

function BasicLayout(props) {
    return (
        <div className="flex w-full h-full">
            <TitleBar />
            <div className="absolute top-[85px] left-[50%] translate-x-[-62%] flex flex-row h-min">
                <Navigation />
                <div className="flex flex-col items-center h-full w-[500px]">
                    {props.children}
                </div>
            </div>
        </div>
    )
}

export function TitleBar() {
    const auth = useAuth0()
    return (
        <div className="z-10 fixed top-0 left-0 flex flex-row items-center justify-between h-[70px] w-full bg-neutral-700 px-[50px]">
            <img src={Logo} alt="Logo" className="w-[250px]" />
            <SearchBar />
            <p className="text-neutral-500 h5 w-[250px]">
                {/* Hi,
                <span className="font-bold text-primary-500">
                    {' ' + auth.user.name}
                </span> */}
            </p>
        </div>
    )
}

export function SearchBar() {
    const [searchParams, setSearchParams] = useSearchParams()
    const [input, setInput] = useState(
        searchParams.get('q') ? searchParams.get('q') : '',
    )

    const navigate = useNavigate()

    const range = searchParams.get('range')
        ? searchParams.get('range')
        : 'All Time'

    const sort = searchParams.get('sort') ? searchParams.get('sort') : 'Newest'

    function handleKeyDown(event) {
        if (event.key === 'Enter') {
            navigate(
                `/explore/search?q=${input}&range=${range}&sort=${sort}`,
                {},
            )
        }
    }

    return (
        <div className="flex flex-row items-center w-[440px] h-[45px] py-[5px] pl-[15px] pr-[10px] bg-neutral-600 rounded-[100px] space-x-[10px]">
            <i className="fas fa-search text-[25px] text-neutral-400"></i>
            <input
                className="w-full outline-none bg-neutral-600 text-neutral-400 text-body"
                placeholder={'Search'}
                value={input}
                onInput={(e) => setInput(e.target.value)}
                onKeyDown={(e) => handleKeyDown(e)}
            />
        </div>
    )
}

export function Navigation() {
    const location = useLocation()
    return (
        <div className="sticky top-[85px] flex flex-col p-[15px] gap-[20px] h-min">
            <Tab path="/" icon="fas fa-home" label="Home" mainPath={'home'} />
            <Tab
                path="/explore/search"
                icon="fas fa-globe"
                label="Explore"
                mainPath={'explore'}
            />
            <Tab
                path="/following"
                icon="fas fa-bell"
                label="Following"
                mainPath={'following'}
            />
            {/* <Tab
                path="/calendar"
                icon="fas fa-calendar-alt"
                label="Calendar"
            /> */}
            {/* <Tab path="/settings" icon="fas fa-cog" label="Settings" /> */}
        </div>
    )
}

export function Tab(props) {
    const location = useLocation()
    const isCurrent = location.pathname.split('/')[1] == props.mainPath

    const iconStyles =
        props.icon +
        ' text-[25px] ' +
        (isCurrent ? 'text-primary-500' : 'text-neutral-400')

    const labelStyles =
        'ml-[9px] h5 leading-none ' +
        (isCurrent ? 'text-primary-500' : 'text-neutral-400')

    return (
        <Link to={props.path} className="flex items-center min-w-min min-h-min">
            <div className="flex items-center justify-center h-[25px] w-[25px]">
                <i className={iconStyles} />
            </div>

            <span className={labelStyles}>{props.label}</span>
        </Link>
    )
}

export default BasicLayout
