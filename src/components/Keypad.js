import React, { useEffect, useState } from 'react'
import KeypadRow from "./KeypadRow";

export default function Keypad({ usedKeys, handleKeyUp }) {
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
          <KeypadRow key={`kpr${i}`} row={r} usedKeys={usedKeys} handleKeyUp={handleKeyUp} />
      ))}
    </div>
  )
}
