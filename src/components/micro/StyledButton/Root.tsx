import React from 'react'

const Root = ({
    children,
    type,
    action,
    className,
    disabled,
} : {
    children: React.ReactNode,
    type?: "primary" | "secondary" | "dark",
    action?: () => void,
    className?: string,
    disabled?: boolean
}) => {

    let sty
    if(type === 'secondary'){
        sty = 'text-gray-600 ring-1 ring-inset ring-gray-300 hover:bg-gray-50'
    } else if(type === 'dark'){
        sty = 'bg-slate-600 text-sm text-white hover:bg-slate-500'
    } else {
        sty = 'bg-blue-600 text-white hover:bg-blue-500'
    }

    return (
        <button type="button" onClick={action} disabled={disabled} className={`items-center gap-x-2 rounded-md px-3.5 py-2.5 text-sm font-semibold ${sty} shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 ${className}`}>
            {children}
        </button>
    )
}

export default Root