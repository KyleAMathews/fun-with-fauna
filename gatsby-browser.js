const React = require(`react`)
const faunadb = require(`faunadb`)
const FaunaContext = require(`./src/fauna-context.ts`).default

const q = faunadb.query
const client = new faunadb.Client({
  secret: process.env.GATSBY_FAUNADB_USER_TOKEN,
})

function Streamer({ children }) {
  console.log({ children })
  const [data, setData] = React.useState({})

  React.useEffect(() => {
    const docRef = q.Ref(q.Collection(`likes`), `301490834008703501`)
    var stream = client.stream
      .document(docRef)
      .on(`snapshot`, (data, event) => {
        console.log(`snapshot`, { data, event })
        setData(data.data)
      })
      .on(`version`, (data, event) => {
        console.log(`version`, { data, event }, data.document.data)
        setData(data.document.data)
      })
      .on(`history_rewrite`, (data, event) => {
        console.log(`history_rewrite`, { data, event })
        // setData(data.data)
      })
      .on(`error`, (data, event) => console.log({ data, event }))
    stream.start()
    console.log(stream)
  }, [])

  return <FaunaContext.Provider value={data}>{children}</FaunaContext.Provider>
}

exports.wrapRootElement = ({ element }) => {
  return <Streamer>{element}</Streamer>
}
