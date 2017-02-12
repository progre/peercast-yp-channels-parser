const webpack = require("webpack");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const failPlugin = require("webpack-fail-plugin");
const uglifySaveLicense = require("uglify-save-license");

const isProduction = process.env.NODE_ENV === "production";

function tsModule(targets) {
    return {
        rules: [{
            test: /\.tsx?$/,
            use: [
                {
                    loader: "babel-loader",
                    options: {
                        env: {
                            delelopment: {
                                plugins: [[
                                    "babel-plugin-espower",
                                    { "embedAst": true }
                                ]]
                            },
                            production: {
                                presets: ["babili"]
                            }
                        },
                        presets: [["env", { targets }]]
                    }
                },
                {
                    loader: "ts-loader",
                    options: { compilerOptions: { sourceMap: !isProduction } }
                }
            ]
        }]
    };
}

module.exports = {
    devtool: isProduction
        ? false
        : "inline-source-map",
    entry: {
        index: ["core-js", "./src/index.ts"],
        "test/test": ["core-js", "./src/test/test.ts"]
    },
    externals: /^(?!\.)/,
    module: tsModule({ node: 6 }),
    node: {
        __filename: true,
        __dirname: true
    },
    output: {
        filename: "lib/[name].js",
        libraryTarget: "commonjs2"
    },
    plugins: isProduction
        ? [failPlugin]
        : [],
    resolve: { extensions: [".ts", ".tsx", ".js"] },
    target: "node"
};
