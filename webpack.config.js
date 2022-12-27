const path = require("path");

module.exports = {
    watch: true,
    entry: './src/script.ts',
    module: {
        rules: [
            {
                test: /\.ts?$/, 
                use: 'ts-loader',
                exclude: /node_modules/,
            }
        ]
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js']
    },
    output: {
        filename: 'script.js',
        path: path.resolve(__dirname, 'public')
    }
}