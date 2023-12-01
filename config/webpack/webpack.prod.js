import FileIncludeWebpackPlugin from 'file-include-webpack-plugin-replace';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import TerserPlugin from 'terser-webpack-plugin';
import CopyPlugin from 'copy-webpack-plugin';
import { path } from '../settings/path.js';
import fs from 'fs';

let pugPages = fs.readdirSync(path.srcFolder).filter(fileName => fileName.endsWith('.pug'))
let htmlPages = []

if (!pugPages.length) {
    htmlPages = [new FileIncludeWebpackPlugin({
        source: path.srcFolder,
        destination: '../',
        htmlBeautifyOptions: {
            'indent-with-tabs': true,
            'indent_size': 4
        },
        replace: [
            { regex: 'NAME__PROJECT', to: path.rootFolder },
            { regex: '../content', to: 'content' },
            { regex: '@content', to: 'content' }
        ]
    })]
}

const config = {
    mode: 'production',
    cache: {
        type: 'filesystem'
    },
    optimization: {
        minimizer: [new TerserPlugin({
            extractComments: false
        })]
    },
    output: {
        path: path.built,
        filename: 'app.min.js',
        publicPath: '/'
    },
    module: {
        rules: [
            {
                test: /\.(scss|css)$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'string-replace-loader',
                        options: {
                            search: '@content',
                            replace: '../content',
                            flags: 'g'
                        }
                    }, {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 0,
                            sourceMap: false,
                            modules: false,
                            url: {
                                filter: (url) => {
                                    if (url.includes('content') || url.includes('fonts')) {
                                        return false;
                                    }
                                    return true;
                                }
                            }
                        }
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            sassOptions: {
                                outputStyle: 'expanded'
                            }
                        }
                    }
                ]
            }, {
                test: /\.pug$/,
                use: [
                    {
                        loader: 'pug-loader'
                    }, {
                        loader: 'string-replace-loader',
                        options: {
                            search: '@content',
                            replace: 'content',
                            flags: 'g'
                        }
                    }
                ]
            }
        ],
    },
    plugins: [
        ...htmlPages,
        ...pugPages.map(pugPage => new HtmlWebpackPlugin({
            filename: `../${pugPage.replace(/\.pug/, '.html')}`,
            template: `${path.srcFolder}/${pugPage}`,
            minify: false
        })),
        new MiniCssExtractPlugin({
            filename: '../css/style.css'
        }),
        new CopyPlugin({
            patterns: [
                {
                    from: `${path.root}/files`, to: '../files',
                    noErrorOnMissing: true
                }, {
                    from: `${path.root}/favicon.svg`, to: '../',
                    noErrorOnMissing: true
                }
            ]
        })
    ],
    resolve: {
        extensions: [
            '.scss',
            '.css',
            '.js'
        ],
        alias: {
            '@content': `${path.root}/content`,
            '@scss': `${path.root}/scss`,
            '@js': `${path.root}/js`
        }
    }
}
export default config;