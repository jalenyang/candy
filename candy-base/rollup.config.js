import { nodeResolve } from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import alias from "@rollup/plugin-alias";
import replace from "@rollup/plugin-replace";
import eslint from "@rollup/plugin-eslint";
import { babel } from "@rollup/plugin-babel";
import clear from "rollup-plugin-clear";
import json from "@rollup/plugin-json";
import filesize from "rollup-plugin-filesize";
import { name } from "./package.json";


export default {
  input: "src/index.js",
  output: [{
    file: `dist/${name}.iife.js`,
    format: "iife",
    name: name,
    extend: true
  }, {
    file: `dist/${name}.esm.js`,
    format: "es"
  }],
  plugins: [json(), clear({
    targets: ["dist"]
  }), alias(), replace({
    "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV || "development"), preventAssignment: true
  }), nodeResolve(), commonjs({
    include: "node_modules/**"
  }), eslint({
    throwOnError: true, include: ["src/**"], exclude: ["node_modules/**"]
  }), babel({ babelHelpers: "bundled" }), filesize()]
};
