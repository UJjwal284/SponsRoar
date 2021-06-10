import React from 'react'
import $ from "jquery";

const AlertBox = ({message}) => {
    $(document).ready(function () {
        $('.alr').hide();
    });

    return (
        <div className="alert alert-primary text-center alr w-100 " role="alert">{message}</div>
    )
}

export default AlertBox;