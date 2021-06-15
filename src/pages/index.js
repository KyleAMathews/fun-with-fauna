import * as React from "react"
import FaunaContext from "../fauna-context.ts"

export default function Index() {
  const data = React.useContext(FaunaContext)
  console.log({ data })
  return (
    <div>
      <button
        onClick={e => {
          e.preventDefault()
          fetch(`/api/increment-like`, { method: `POST` })
        }}
      >
        Increment!
      </button>
      <br />
      <br />
      Super duper {JSON.stringify(data)}
    </div>
  )
}
