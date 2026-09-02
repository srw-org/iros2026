const event = require("./event.json");

// The hub serves this site under its canonical path, so every asset URL has to
// carry that prefix. Build with `--prefix-paths` (see package.json).
module.exports = {
  pathPrefix: event.canonicalPath.replace(/\/$/, ""),
  siteMetadata: {
    title: event.title,
    hubUrl: event.hubUrl,
  },
  plugins: [
    "gatsby-plugin-typescript",
    "gatsby-plugin-sass",
    "gatsby-plugin-react-helmet",
    "gatsby-plugin-emotion",
  ],
};
