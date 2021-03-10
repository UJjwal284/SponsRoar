import React from 'react'

const Loading = () => {
    return (
        <div className="d-flex justify-content-center lo vh-100 pt-5">
            <div className="spinner-grow text-purple" role="status">
                <span className="sr-only">Loading...</span>
            </div>
        </div>
    )
}

export default Loading;