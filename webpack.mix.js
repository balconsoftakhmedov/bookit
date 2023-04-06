let mix = require('laravel-mix');
require('laravel-mix-clean');

const isDev = process.env.NODE_ENV === 'development';

const srcDashboardPath = extraPath => path.resolve(__dirname, `./assets/src/dashboard${extraPath}`);

const srcFrontendPath = extraPath => path.resolve(__dirname, `./assets/src/frontend${extraPath}`);

mix.webpackConfig({
  resolve: {
    extensions: ['.js', '.json'],
    alias: {
      // Frontend Aliases
      '@': srcFrontendPath(),
      '@views': srcFrontendPath('/@views'),
      '@components': srcFrontendPath('/components'),
      '@sections': srcFrontendPath('/components/sections'),
      '@mixins': srcFrontendPath('/mixins'),
      '@store': srcFrontendPath('/store'),
      // Dashboard Aliases
      '@dashboard': srcDashboardPath(),
      '@dashboard-components': srcDashboardPath('/components'),
      '@dashboard-addons': srcDashboardPath('/components/addons'),
      '@dashboard-partials': srcDashboardPath('/components/partials'),
      '@dashboard-sections': srcDashboardPath('/components/sections'),
      '@dashboard-calendar': srcDashboardPath('/components/calendar'),
      '@dashboard-mixins': srcDashboardPath('/mixins'),
      '@dashboard-store': srcDashboardPath('/store'),
    },
  },
  devtool: isDev ? 'source-map' : ''
});

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for your application, as well as bundling up your JS files.
 |
 */

mix.setResourceRoot('../../').setPublicPath('assets/dist')
  .js(srcFrontendPath('/app.js'), 'assets/dist/frontend/js/')
  .sass('assets/scss/frontend/app.scss', 'assets/dist/frontend/css/')
  .js(srcDashboardPath('/app.js'), 'assets/dist/dashboard/js/')
  .sass('assets/scss/dashboard/app.scss', 'assets/dist/dashboard/css/')
  .sass('assets/scss/dashboard/addons.scss', 'assets/dist/dashboard/css/')
  .sass('assets/scss/dashboard/conflux.scss', 'assets/dist/dashboard/css/')
  .clean()
  .disableNotifications();

// Full API
// mix.js(src, output);
// mix.ts(src, output); <-- TypeScript support. Requires tsconfig.json to exist in the same folder as webpack.mix.js
// mix.extract(vendorLibs);
// mix.sass(src, output);
// mix.postCss(src, output, [require('postcss-some-plugin')()]);
// mix.browserSync('my-site.test');
// mix.combine(files, destination);
// mix.babel(files, destination); <-- Identical to mix.combine(), but also includes Babel compilation.
// mix.copy(from, to);
// mix.copyDirectory(fromDir, toDir);
// mix.minify(file);
// mix.sourceMaps(); // Enable sourcemaps
// mix.disableNotifications();
// mix.setPublicPath('path/to/public');
// mix.setResourceRoot('prefix/for/resource/locators');
// mix.autoload({}); <-- Will be passed to Webpack's ProvidePlugin.
// mix.webpackConfig({}); <-- Override webpack.config.js, without editing the file directly.
// mix.babelConfig({}); <-- Merge extra Babel configuration (plugins, etc.) with Mix's default.
// mix.then(function () {}) <-- Will be triggered each time Webpack finishes building.
// mix.override(function (webpackConfig) {}) <-- Will be triggered once the webpack config object has been fully generated by Mix.
// mix.dump(); <-- Dump the generated webpack config object to the console.
// mix.extend(name, handler) <-- Extend Mix's API with your own components.
// mix.options({
//   extractVueStyles: false, // Extract .vue component styling to file, rather than inline.
//   globalVueStyles: file, // Variables file to be imported in every component.
//   processCssUrls: true, // Process/optimize relative stylesheet url()'s. Set to false, if you don't want them touched.
//   purifyCss: false, // Remove unused CSS selectors.
//   terser: {}, // Terser-specific options. https://github.com/webpack-contrib/terser-webpack-plugin#options
//   postCss: [] // Post-CSS options: https://github.com/postcss/postcss/blob/master/docs/plugins.md
// });
