module.exports = {
    mode: 'development',
    entry: "./src/mjs/main.mjs",
    output: {
        filename: "./bundle.js"
    },
    module: {
        rules: [
            {
                test: /\.mjs$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            }
        ]
    }
}