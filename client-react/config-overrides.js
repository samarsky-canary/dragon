module.exports = function override(config, env) {
    module: {
        rules: [
          // ...
          {
            test: /\.md$/,
            use: "raw-loader",
          },
        ]
      };
    return config;
}