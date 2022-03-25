const ogs = require("open-graph-scraper");

export default async function meta(req, res) {
  const { url } = req.body;
  const options = { url: url };
  try {
    await ogs(options, (error, results) => {
      if (error) {
        res.status(404).json(results);
      } else {
        res.status(200).json(results);
      }
    });
  } catch (ex) {
    console.log(ex);
  }
}
