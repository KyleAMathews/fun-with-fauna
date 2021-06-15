import { GatsbyFunctionRequest, GatsbyFunctionResponse } from "gatsby"
import faunadb from "faunadb"

const q = faunadb.query
const client = new faunadb.Client({ secret: process.env.FAUNADB_SECRET })

export default async function handler(
  req: GatsbyFunctionRequest,
  res: GatsbyFunctionResponse
) {
  if (req.method === `POST`) {
    let data = {}
    try {
      data = await client.query(
        q.Let(
          {
            docRef: q.Ref(q.Collection(`likes`), `301490834008703501`),
          },
          q.Update(q.Select(`ref`, q.Get(q.Var(`docRef`))), {
            data: {
              [req.body.path]: {
                count: q.Add(
                  q.Select(
                    [`data`, req.body.path, `count`],
                    q.Get(q.Var(`docRef`)),
                    0
                  ),
                  1
                ),
              },
            },
          })
        )
      )
    } catch (e) {
      console.log(e)
    }
    console.log(data)
    res.json(data)
  } else {
    res.send(`use Post`)
  }
}
