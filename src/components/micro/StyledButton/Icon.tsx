
const Icon = ({icon}: { icon: JSX.Element }) => {
    return (
        <svg className="-ml-0.5 h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            {icon}
        </svg>
    )
}

export default Icon