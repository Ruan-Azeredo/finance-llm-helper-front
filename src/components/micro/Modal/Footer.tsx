import React from 'react'

const Footer = ({children} : {children: React.ReactNode}) => {
    return (
        <div className="sm:flex sm:flex-row-reverse flex flex-col gap-3">
            {children}
        </div>
    )
}

export default Footer