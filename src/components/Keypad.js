import React, { useEffect, useState } from 'react'
import KeypadRow from "./KeypadRow";

//todo: put keypad in qwerty order
//todo: make keypad rows match a regular keyboard
//todo: make keys clickable

export default function Keypad({ usedKeys }) {
  const [rows, setRows] = useState(null)

  useEffect(() => {
    fetch('http://localhost:3001/letters')
      .then(res => res.json())
      .then(json => {
        setRows(json)
      })
  }, [])

  return (
    <div className="keypad">
      {rows && rows.map((r, i) => (
          <KeypadRow key={`kpr${i}`} row={r} usedKeys={usedKeys} />
      ))}
    </div>
  )
}
