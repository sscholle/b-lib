import babel from 'rollup-plugin-babel';
import sass from 'rollup-plugin-sass';
import postcss from 'postcss';
import fs from 'fs';
import cssnano from 'cssnano';
import autoprefixer from 'autoprefixer';

const sassOptions = {
  output(styles) {
    fs.writeFileSync('./build/bundle.css', styles);
  },
  processor: css =>
    postcss([
      autoprefixer({
        grid: false,
      }),
      cssnano(),
    ])
      .process(css)
      .then(result => result.css),
};

const customBabelConfig = {
  babelrc: false,
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          browsers: [
            'Chrome >= 52',
            'FireFox >= 44',
            'Safari >= 7',
            'Explorer 11',
            'last 4 Edge versions',
          ],
        },
        modules: false,
        useBuiltIns: false,
      },
    ],
    '@babel/preset-react',
  ],
  plugins: [
    '@babel/plugin-proposal-object-rest-spread',
    'syntax-async-functions',
    '@babel/plugin-transform-regenerator',
    'flow-react-proptypes',
    '@babel/transform-flow-strip-types',
    '@babel/plugin-syntax-dynamic-import',
    '@babel/plugin-proposal-class-properties',
    '@babel/plugin-proposal-private-methods',
    ['babel-plugin-webpack-alias-7', { config: './webpack.config.base.js' }],
    'css-modules-transform',
    '@babel/plugin-proposal-export-default-from',
    '@babel/plugin-proposal-optional-chaining',
  ],
  exclude: /node_modules/,
};

export default {
  input: './index.js',
  output: {
    file: './build/bundle.js',
    name: 'blib',
    format: 'umd',
    // sourcemap: 'inline',
    globals: {
      react: 'React',
      'prop-types': 'PropTypes',
    },
  },
  plugins: [babel(customBabelConfig), sass(sassOptions)],
  external: ['react', 'react-dom', 'prop-types', 'styled-components'],
};