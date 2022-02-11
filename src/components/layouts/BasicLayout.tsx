import { useAuth0 } from '@auth0/auth0-react'
import { IconDefinition } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { Dispatch, SetStateAction, useState } from 'react'
import {
    Link,
    useSearchParams,
    useNavigate,
    useLocation,
} from 'react-router-dom'
import {
    faHome as fasHome,
    faGlobe as fasGlobe,
    faBell as fasBell,
    faSearch as fasSearch,
} from '@fortawesome/free-solid-svg-icons'

interface BasicLayoutProps {
    children: JSX.Element
}

function BasicLayout(props: BasicLayoutProps) {
    return (
        <div className="flex w-full h-full">
            <TitleBar />
            <div className="absolute top-[70px] left-[50%] translate-x-[-59%] flex flex-row h-min">
                <Navigation />
                <div className="flex flex-col items-center h-full w-[750px]">
                    {props.children}
                </div>
            </div>
        </div>
    )
}

export function TitleBar() {
    const { logout } = useAuth0()
    return (
        <div className="z-10 fixed top-0 left-0 flex flex-row items-center justify-between h-[70px] w-full px-[50px] bg-neutral-800">
            <img
                src="https://img.assetalchemy.io/LOGO_COLOR.svg"
                alt="Logo"
                className="w-[250px]"
            />
            <SearchBar />
            <p className="flex justify-end text-error h5 w-[250px]">
                <span
                    className="font-bold cursor-pointer"
                    onClick={() => logout()}
                >
                    Sign Out
                </span>
            </p>
        </div>
    )
}

export function SearchBar() {
    const [searchParams, setSearchParams] = useSearchParams()
    const [input, setInput]: [
        string | null,
        Dispatch<SetStateAction<string | null>>,
    ] = useState(searchParams.get('q') ? searchParams.get('q') : '')

    const navigate = useNavigate()

    function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
        if (event.key === 'Enter') {
            navigate(`/explore/search?q=${input}`, {})
        }
    }

    return (
        <div className="flex flex-row justify-self-start items-center w-[440px] h-[45px] py-[5px] pl-[15px] pr-[10px] bg-neutral-600 rounded-[100px] space-x-[10px]">
            <FontAwesomeIcon
                icon={fasSearch}
                className="text-[25px] text-neutral-400"
            />
            <input
                className="w-full outline-none bg-neutral-600 text-neutral-400 text-body h4"
                placeholder={'Search'}
                value={input?.toString()}
                onInput={(e) =>
                    setInput((e.target as HTMLTextAreaElement).value)
                }
                onKeyDown={(e) => handleKeyDown(e)}
            />
        </div>
    )
}

export function Navigation() {
    const location = useLocation()
    return (
        <div className="sticky top-[85px] flex flex-col p-[15px] gap-[20px] h-min">
            <Tab path="/home" icon={fasHome} label="Home" mainPath={'home'} />
            <Tab
                path="/explore/search"
                icon={fasGlobe}
                label="Explore"
                mainPath={'explore'}
            />
            <Tab
                path="/following"
                icon={fasBell}
                label="Following"
                mainPath={'following'}
            />
            {/* <Tab
                path="/calendar"
                icon="fas fa-calendar-alt"
                label="Calendar"
            /> */}
        </div>
    )
}

interface TabProps {
    label: string
    mainPath: string
    icon: IconDefinition
    path: string
}

export function Tab(props: TabProps) {
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
                <FontAwesomeIcon icon={props.icon} className={iconStyles} />
            </div>

            <span className={labelStyles}>{props.label}</span>
        </Link>
    )
}

export default BasicLayout
