const fs = require("fs");
const path = require("path");

const event = require("./event.json");

// Pages lifted out of the hub may rely on a siteMetadata block that lived in
// the hub config; extraction writes it here so their queries keep resolving.
const metadataPath = path.join(__dirname, "event-metadata.json");
const extraMetadata = fs.existsSync(metadataPath) ? require(metadataPath) : {};

// The hub serves this site under its canonical path, so every asset URL has to
// carry that prefix. Build with `--prefix-paths` (see package.json).
module.exports = {
  pathPrefix: event.canonicalPath.replace(/\/$/, ""),
  siteMetadata: {
    title: event.title,
    hubUrl: event.hubUrl,
    ...extraMetadata,
  },
  plugins: [
    "gatsby-plugin-typescript",
    "gatsby-plugin-sass",
    "gatsby-plugin-antd",
    "gatsby-plugin-react-helmet",
    "gatsby-plugin-emotion",
    "gatsby-transformer-sharp",
    "gatsby-plugin-sharp",
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "images",
        path: path.join(__dirname, "static", "images"),
      },
    },
  ],
};
