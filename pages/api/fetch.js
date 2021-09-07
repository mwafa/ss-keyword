import axios from "axios"

export default async (req, res) => {
  const { url } = req.query
  const method = req.method
  await axios({
    url,
    method,
  })
    .then(({ data }) => {
      if (typeof data === "object") return res.json(data)
      res.end(data)
    })
    .catch((e) => {
      console.log(e)
      if (e.response) res.end(e.response.data)
    })
  res.end()
}
