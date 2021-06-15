import * as React from "react"
import { graphql } from "gatsby"
import FaunaContext from "../../fauna-context"

function LikeCount() {
  const data = React.useContext(FaunaContext)
  console.log({ data })
  return <div>likes: {data && data[window.location.pathname]?.count}</div>
}

export default function BlogPost(props) {
  return (
    <div>
      <h1>{props.data.markdownRemark.frontmatter.title}</h1>
      <button
        onClick={e => {
          e.preventDefault()
          fetch(`/api/increment-like`, {
            method: `POST`,
            headers: {
              Accept: `application/json`,
              "Content-Type": `application/json`,
            },
            body: JSON.stringify({ path: window.location.pathname }),
          }).then(res => res.json())
        }}
      >
        Increment!
      </button>
      <LikeCount />
      <div
        dangerouslySetInnerHTML={{ __html: props.data.markdownRemark.html }}
      />
    </div>
  )
}

export const query = graphql`
  query ($id: String!) {
    markdownRemark(id: { eq: $id }) {
      frontmatter {
        title
        slug
      }
      html
    }
  }
`
