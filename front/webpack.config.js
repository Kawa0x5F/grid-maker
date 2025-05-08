module.exports = {
    experiments: {
        asyncWebAssembly: true,
    },
    resolve: {
        extensions: ['.js', '.wasm'],
    },
    plugins: [
        new HtmlWebpackPlugin(),
    ],
}
