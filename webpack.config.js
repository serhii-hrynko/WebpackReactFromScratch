const path = require('path');
const { DefinePlugin } = require('webpack');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const distPath = path.resolve(__dirname, 'dist');
const srcPath = path.resolve(__dirname, 'src');
const isDevelopment = process.env.NODE_ENV === 'development';

const fileName = (path, ext, useHash) =>
    // path + name
    (path ? path + '/' : '') + (useHash ? `[name].[contenthash].${ext}` : `[name].${ext}`);

const fileLoader = (test, exclude, path, useHash) => {
    return {
        test,
        include: srcPath,
        exclude: exclude,
        loader: 'file-loader',
        options: {
            name: fileName(path, '[ext]', useHash),
        },
    };
};

const jsLoader = (test, exclude) => {
    return {
        test: test,
        include: srcPath,
        exclude: exclude,
        loader: 'babel-loader',
    };
};

const tsLoader = (test, exclude) => {
    return {
        test: test,
        include: srcPath,
        exclude: exclude,
        use: 'ts-loader',
    };
};

const cssLoader = (test, exclude, useCSSModules) => {
    return {
        test: test,
        include: srcPath,
        exclude: exclude,
        use: [
            {
                loader: MiniCssExtractPlugin.loader,
                options: {
                    // see MiniCssExtractPlugin filename path
                    publicPath: '../',
                },
            },
            {
                loader: 'css-loader',
                options: useCSSModules
                    ? {
                        esModule: true,
                        modules: {
                            compileType: 'module',
                            localIdentName: isDevelopment
                                ? '[path][name]__[local]--[hash:base64:8]'
                                : '[hash:base64:8]',
                        },
                    }
                    : {},
            },
            'postcss-loader',
        ],
    };
};

module.exports = {
    context: path.resolve(__dirname, 'src'),
    devtool: isDevelopment ? 'source-map' : false,
    entry: {
        main: ['./index.tsx'],
    },
    output: {
        path: distPath,
        filename: fileName('js', 'js', !isDevelopment),
    },
    resolve: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
    },
    optimization: {
        minimizer: [new CssMinimizerPlugin(), new TerserWebpackPlugin()],
        splitChunks: {
            chunks: 'all',
        },
    },
    plugins: [
        new CleanWebpackPlugin(),
        new DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
            'process.env.PUBLIC_URL': JSON.stringify(''),
        }),
        new HTMLWebpackPlugin({
            template: '../public/index.html',
        }),
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname, 'public/favicon.ico'),
                    to: distPath,
                },
                {
                    from: path.resolve(__dirname, 'env.js'),
                    to: distPath,
                },
            ],
        }),
        new MiniCssExtractPlugin({
            filename: fileName('css', 'css', isDevelopment),
        }),
    ],
    module: {
        rules: [
            jsLoader(/\.(js|jsx)$/, []),
            tsLoader(/\.(ts|tsx)$/, []),
            cssLoader(/\.css$/, [/\.module\.css$/], false),
            cssLoader(/\.module\.css$/, [], true),
            fileLoader(/\.(png|jpg|jpeg|svg|gif)$/, [], 'media', !isDevelopment),
            fileLoader(/\.(ttf|wof|wof2|eot)$/, [], 'fonts', false),
        ],
    },
};
