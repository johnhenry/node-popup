import babel from 'rollup-plugin-babel';
const input = 'src/index.ts';
const plugins = [
    babel({
        exclude: 'node_modules/**',
        extensions: ['.ts']
    })
];

export default [{
    file: 'cjs.js'
}, {
    file: 'esm.mjs',
    format: 'esm'
}].map(({file, format='cjs'})=>({
        input,
        plugins,
        output: {file, format}
}));

// export default [
//     {
//         input,
//         output: {
//             file: 'cjs.js',
//             format: 'cjs'
//         },
//         plugins
//     },
//     {
//         input,
//         output: {
//             file: 'esm.mjs',
//             format: 'esm'
//         },
//         plugins
//     }
// ];
