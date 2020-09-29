import tsPlugin from '@rollup/plugin-typescript';

export default {
    input: './src/index.ts',
    output: {
        format: 'es',
        dir: "dist",
        sourcemap: true,
    },
    external: [ 'react', "react-dom", "react-final-form", "@form-composer/core", 'antd', '@ant-design/icons', 'antd/dist/antd.css'],
    plugins: [
        tsPlugin()
    ]
}