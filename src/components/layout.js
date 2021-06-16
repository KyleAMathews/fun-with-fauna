import * as React from "react"
import FaunaContext from "../fauna-context"

export default function Layout({ children }) {
  const data = React.useContext(FaunaContext)
  const pathname = typeof window !== `undefined` ? window.location.pathname : ``
  return (
    <div>
      <button
        onClick={() => {
          fetch(`/api/increment-count`, {
            method: `POST`,
            headers: { "content-type": `application/json` },
            body: JSON.stringify({ path: window.location.pathname }),
          })
        }}
      >
        increment like
      </button>
      <div>like count: {data && data[pathname]?.count}</div>
      <h1>I am layout</h1>
      {children}
    </div>
  )
}
