import tsPlugin from '@rollup/plugin-typescript';

export default {
    input: './src/index.ts',
    output: {
        format: 'es',
        dir: "dist",
        sourcemap: true,
    },
    external: [ 'react', "final-form", "final-form", "final-form-arrays", "react-final-form" ],
    plugins: [
        tsPlugin()
    ]
}