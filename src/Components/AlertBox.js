import React from 'react'

const AlertBox = ({message}) => {
    return (
        <div className="alert alert-primary text-center alr w-100" role="alert">{message}</div>
    )
}

export default AlertBox;