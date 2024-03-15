import React from "react";

export default function Toast({ showToast, message }) {

    return (
        <div className={"toast " + (showToast ? "showing" : "hidden")}>
            {message}
        </div>
    )
}