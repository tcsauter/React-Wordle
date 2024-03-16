import React from "react";

export default function KeypadRow({ row, usedKeys }) {

    return (
        <div className="keypadRow">
            {row && row.map((l) => {
                const color = usedKeys[l.key]

                return (
                    <div key={l.key} className={color}>{l.key}</div>
                )
            })}
        </div>
    )
}