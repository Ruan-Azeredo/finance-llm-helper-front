import React from 'react'

const Body = ({children, className} : {children: React.ReactNode, className?: string}) => {
    return (
        <div className={`${className}`}>
            {children}
        </div>
    )
}

export default Body