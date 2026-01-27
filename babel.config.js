module.exports = {
  presets: [
    "@babel/preset-flow",
    "@babel/preset-env",
    ["@babel/preset-react", { runtime: "automatic" }],
  ],
};
