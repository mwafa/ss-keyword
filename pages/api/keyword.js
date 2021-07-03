const scrapperJS = require("scraperjs")
export default async (req, res) => {
  const t = new Date().getTime()
  try {
    scrapperJS.StaticScraper.create(
      `https://mykeyworder.com/keywords?tags=${encodeURI(
        req.query.tags
      )}&exclude=${encodeURI(req.query.exclude)}&language=en`
    )
      .scrape(($) => {
        return $("input[type='checkbox']")
          .map(function () {
            return $(this).attr("value")
          })
          .get()
      })
      .then((data) => res.json({ duration: new Date().getTime() - t, data }))
  } catch (e) {
    res.json({ error: true })
  }
}
