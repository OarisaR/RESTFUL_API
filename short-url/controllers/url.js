const shortid = require("shortid");
// this is a npm library that generates a short ID based on given no. of characters

const URL = require("../models/url");

async function generateShortURL(req, res) {
  try {
    const body = req.body;
    if (!body.url) {
      return res.status(400).json({ error: "URL is needed" });
    }
    const shortID = shortid(8);
    await URL.create({
      shortId: shortID,
      redirectURL: body.url,
      visitHistory: [],
      createdBy: req.user._id,
    });
  //  return res.json({ id: shortID });
  return res.render('home' , {
    id: shortID,
  });
  } catch (err) {
    console.error("Error creating URL", err);
    return res.status(500).json({ error: "Server error" });
  }
}

/* 
URL.findOneAndUpdate() is a Mongoose method that:
Finds a document in the URL collection where shortId matches the given value.
Updates it at the same time
*/
async function visitByShortid(req, res) {
  try {
    const shortId = req.params.shortId;
    const entry = await URL.findOneAndUpdate(
      {
        shortId,
      },
      {
        $push: {
          visitHistory: {
            timestamp: Date.now(),
          },
        },
      },
      { new: true }
    );
    if (!entry) {
      return res.status(400).send("Short url not found");
    }
    return res.redirect(entry.redirectURL);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Server error" });
  }
}
async function getAnalytics(req, res) {
  const shortId = req.params.shortId;
  const result = await URL.findOne({ shortId });
  return res.json({
    totalClicks: result.visitHistory.length,
    analytics: result.visitHistory,
  });
}
module.exports = {
  generateShortURL,
  visitByShortid,
  getAnalytics,
};
