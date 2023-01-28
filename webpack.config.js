const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    mode: 'development',
    entry: ['./src/index.tsx'],
    output: {
        path: path.resolve(__dirname, './build'),
        filename: 'bundle.js',
        assetModuleFilename: 'images/[hash][ext]',
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js', ".json"],
    },
    module: {
        rules: [
            {
                test: /\.js$|jsx/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-react', '@babel/preset-env'],
                    },
                },
            },
            {
                test: /\.tsx?$/,
                exclude: /node_modules/,
                loader: 'ts-loader',
            },
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: true,
                            importLoaders: 2,
                            modules: {
                                localIdentName:
                                    '[name]__[local]__[hash:base64:5]',
                            },
                        },
                    },
                    /*{loader:"typings-for-css-modules-loader" },
				{loader:"style-loader" }*/
                ],
            },
            {
                test: /\.(png|jpg|gif|jpe?g|svg)$/,
                type: 'asset/resource',
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './public/index.html',
            filename: 'index.html',
            inject: true,
            minify: true,
        }),
        new MiniCssExtractPlugin({
            filename: 'index.css',
        }),
    ],

    devServer: {
        historyApiFallback: true,
        port: 3000,
        static: {
            directory: path.join(__dirname, 'build'),
        },
        compress: true,
        open: true,
        hot: true,
    },
};
