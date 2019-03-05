const path = require('path');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

module.exports = [
    {
        mode: 'production',
        entry: require.resolve('./lib/problem-map-generator.js'),
        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: 'problem-map-generator.min.js',
            library: 'ProblemMapGenerator',
        },
        module: {
            rules: [
                {
                    enforce: 'pre',
                    test: /\.js$/,
                    include: [path.resolve(__dirname, 'lib')],
                    exclude: [path.resolve(__dirname, 'node_modules')]
                },
                {
                    test: /\.js$/,
                    include: [path.resolve(__dirname, 'lib')],
                    exclude: [path.resolve(__dirname, 'node_modules')],
                    loader: 'babel-loader',
                    options: {
                        presets: ['env']
                    }
                }
            ]
        },
        plugins: [
            new UglifyJSPlugin()
        ]
    },
    {
        mode: 'production',
        entry: require.resolve('./lib/problem-map-generator.js'),
        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: 'problem-map-generator.node.min.js',
            libraryTarget: 'commonjs'
        },
        module: {
            rules: [
                {
                    enforce: 'pre',
                    test: /\.js$/,
                    include: [path.resolve(__dirname, 'lib')],
                    exclude: [path.resolve(__dirname, 'node_modules')]
                },
                {
                    test: /\.js$/,
                    include: [path.resolve(__dirname, 'lib')],
                    exclude: [path.resolve(__dirname, 'node_modules')],
                    loader: 'babel-loader',
                    options: {
                        presets: ['env']
                    }
                }
            ]
        },
        plugins: [
            new UglifyJSPlugin()
        ]
    }];