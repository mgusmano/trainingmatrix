import resolve from 'rollup-plugin-node-resolve'
import css from "rollup-plugin-import-css";
import babel from '@rollup/plugin-babel'
import commonjs from '@rollup/plugin-commonjs';
import replace from 'rollup-plugin-replace'

const OUTPUT_FOLDER = "build/";
const DOC_FOLDER = "docs/";

const production = process.env.NODE_ENV === "prodx";

const plugins = [
    css(),
    resolve({
        browser: true,
        extensions: ['.js', '.jsx', '.json'],
    }),
    babel({
        presets: ["@babel/preset-react"],
        exclude: 'node_modules/**',
    }),
    commonjs(),
    replace({
        'process.env.NODE_ENV': production
          ? JSON.stringify('production')
          : JSON.stringify('development'),
    }),
]

export default [
  {
    input: 'src/index.js',
    output: {
      file: `${OUTPUT_FOLDER}bundle.js`,
      format: "iife",
      sourcemap: true,
    },
    plugins
  },
  {
    input: 'src/index.js',
    output: {
      file: `${DOC_FOLDER}bundle.js`,
      format: "iife",
      sourcemap: true,
    },
    plugins
  }
];