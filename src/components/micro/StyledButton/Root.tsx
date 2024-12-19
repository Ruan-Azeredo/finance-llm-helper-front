import React from 'react'

const Root = ({children, type, action} : {children: React.ReactNode, type?: "primary" | "secondary", action?: () => void}) => {

    let sty
    if(type === 'secondary'){
        sty = 'text-gray-600 ring-1 ring-inset ring-gray-300 hover:bg-gray-50'
    } else {
        sty = 'bg-indigo-600 text-white hover:bg-indigo-500'
    }

    return (
        <button type="button" onClick={action} className={`inline-flex items-center gap-x-2 rounded-md px-3.5 py-2.5 text-sm font-semibold ${sty} shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600`}>
            {children}
        </button>
    )
}

export default Root