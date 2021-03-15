import React from 'react'

const AlertBox = ({message}) => {
    return (
        <div className="alert alert-primary text-center d1 w-100" role="alert">{message}</div>
    )
}

export default AlertBox;