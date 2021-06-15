import { GatsbyFunctionRequest, GatsbyFunctionResponse } from "gatsby"
import faunadb from "faunadb"

const q = faunadb.query
const client = new faunadb.Client({ secret: process.env.FAUNADB_SECRET })

export default async function handler(
  req: GatsbyFunctionRequest,
  res: GatsbyFunctionResponse
) {
  const data = await client.query(
    q.Map(q.Paginate(q.Documents(q.Collection(`likes`)), {}), like =>
      q.Get(like)
    )
  )
  res.json(data.data.map(d => d.data))
}
