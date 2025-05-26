const mix = require('laravel-mix');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

mix.setPublicPath('public')
    .setResourceRoot('../') // Turns assets paths in css relative to css file
    .vue()
    .sass('resources/sass/frontend/app.scss', 'css/frontend.css')
    .sass('resources/sass/backend/app.scss', 'css/backend.css')
    .js('resources/js/frontend/app.js', 'js/frontend.js')
    .js('resources/js/backend/app.js', 'js/backend.js')
    .extract([
        'alpinejs',
        'jquery',
        'bootstrap',
        'popper.js',
        'axios',
        'sweetalert2',
        'lodash'
    ])
    .sourceMaps();

if (mix.inProduction()) {
    mix.version();
} else {
    // Uses inline source-maps on development
    mix.webpackConfig({
        devtool: 'inline-source-map'
    });

    // 🔁 Habilita hot reload con BrowserSync
    mix.browserSync({
        proxy: 'localhost:8000', // 👈 tu Laravel dentro de Docker
        open: false,
        port: 3000,               // 👈 donde se levantará BrowserSync
        files: [
            'app/**/*.php',
            'resources/views/**/*.php',
            'routes/**/*.php',
            'public/js/**/*.js',
            'public/css/**/*.css'
        ]
    });
}
