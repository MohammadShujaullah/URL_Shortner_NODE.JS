const { nanoid } = require("nanoid");
const URL = require("../models/url");

async function handlegenerateShortURL(req, res) {
  try {
    const { url } = req.body;

    // safety check
    if (!url) {
      return res.status(400).json({ error: "URL is required" });
    }

    const shortId = nanoid(8);

    await URL.create({
      shortId,
      redirectUrl: url, //  REQUIRED FIELD
      visitHistory: [],
    });

    return res.status(201).json({ id: shortId });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Server error" });
  }
}

async function handleVisitThroughShortURL(req, res) {
  const shortId = req.params.shortId;

  const entry = await URL.findOneAndUpdate( //entry is also a type of URL ,which is find by the shortId
    { shortId },
    {
      $push: {                           //push is used to add new data to an array field in mongodb
        visitHistory: { timestamp: Date.now() }
      }
    }
  );

  if (!entry) {
    return res.status(404).json({ error: "Short URL not found" });
  }

  res.redirect(entry.redirectUrl);         //redirect to original URL

}

async function handleGetAnalytics(req,res){
  const shortid=req.params.shortId;

  const result=await URL.findOne({shortid});

  return res.json({totalClicks:result.visitHistory.length,
    visitedHistory:result.visitHistory
  })
}

module.exports = { handlegenerateShortURL, handleVisitThroughShortURL ,handleGetAnalytics};
