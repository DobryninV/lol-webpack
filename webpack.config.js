const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    mode: "development",
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: "babel-loader",
                    }
                ]
            },
            {
                test: /\.glsl$/,
                exclude: /node_modules/,
                use: {
                    loader: 'webpack-glsl-loader',
                },
            },
            {
                test: /\.(png|jp(e*)g|svg|gif|ico)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'file-loader',
                    options: {
                        modules: true,
                    }
                },
            },
            {
                test: /\.css$/i,
                use: [
                    "style-loader", 
                    {
                        loader: 'css-loader',
                        options: {
                            modules: true,
                        }
                    },
                ],
            },
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            buildTime: new Date(),
            template: 'public/index.html'
        })
    ]
}