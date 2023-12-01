import * as node from 'path';
const rootFolder = node.basename(node.resolve())
const reportsFolder = './reports';
const buildFolder = './build';
const srcFolder = './src';

export const path = {
    build: {
        images: `${buildFolder}/content/`,
        fonts: `${buildFolder}/fonts/`,
        files: `${buildFolder}/files/`,
        json: `${buildFolder}/json/`,
        css: `${buildFolder}/css/`,
        js: `${buildFolder}/js/`,
        html: `${buildFolder}/`
    },
    src: {
        images: `${srcFolder}/content/**/*.{jpg,png,webp}`,
        fonts: `${srcFolder}/content/fonts/*.*`,
        scss: `${srcFolder}/scss/style.scss`,
        svg: `${srcFolder}/content/**/*.svg`,
        svgsprite: `${srcFolder}/svg/*.svg`,
        files: `${srcFolder}/files/**/*.*`,
        json: `${srcFolder}/json/*.json`,
        pug: `${srcFolder}/pug/*.pug`,
        js: `${srcFolder}/js/app.js`,
        html: `${srcFolder}/*.html`
    },
    built: node.resolve(buildFolder),
    root: node.resolve(srcFolder),
    ftp: rootFolder,
    reportsFolder,
    buildFolder,
    rootFolder,
    srcFolder
}