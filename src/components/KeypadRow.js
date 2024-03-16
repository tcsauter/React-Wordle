import React from "react";

export default function KeypadRow({ row, usedKeys, handleKeyUp }) {

    return (
        <div className="keypadRow">
            {row && row.map((l) => {
                const color = usedKeys[l.key]

                return (
                    <button key={l.key} className={color} onClick={() => handleKeyUp(l)}>{l.key}</button>
                )
            })}
        </div>
    )
}