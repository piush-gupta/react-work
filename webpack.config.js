
module.exports = {
	entry: "./App/app.jsx",
    output: {
        path: "./App/build",
        filename: "app.js",
    },
    node: {
        fs: "empty"
    },
    module: {
     loaders: [
            { test: /\.jsx$/, loader: "jsx-loader" }
        ]  
    }
}