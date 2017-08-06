module.exports = {
    entry: __dirname + '/src/client/vendors.js',
    output: {
        filename: "dll.vendors.js",
        path: __dirname + "/dist/public/vendor/javascript"
    },

    // Enable sourcemaps for debugging webpack's output.
    devtool: "source-map",

    resolve: {
        // Add '.ts' and '.tsx' as resolvable extensions.
        extensions: [".js"]
    },

    module: {
        rules: [
            // All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
            { test: /\.tsx?$/, loader: "awesome-typescript-loader" },

            // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
            { enforce: "pre", test: /\.js$/, loader: "source-map-loader" },

            {
                test: /\.(js)$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            }
        ]
    }
};
