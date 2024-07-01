import {resolve} from "node:path"

// https://nuxt.com/docs/api/configuration/nuxt-config
// @ts-ignore
// @ts-ignore
export default defineNuxtConfig({
    app: {
        baseURL: '/',
        head: {
            charset: 'utf-8',
            viewport: 'width=device-width, initial-scale=1',
        },
        buildAssetsDir: 'assets',
        pageTransition: {name: 'page', mode: 'out-in'}
    },
    routeRules: {
        '/': {redirect: '/login'},
    },
    devtools: {enabled: true},
    modules: [
        '@sidebase/nuxt-auth',
        '@nuxt/image',
        '@nuxtjs/tailwindcss',
        'nuxt-snackbar'
    ],
    snackbar: {
        bottom: true,
        right: true,
        duration: 5000
    },
    auth: {
        // origin: process.env.ORIGIN,
        isEnabled: true,
        globalAppMiddleware: true,
        origin: 'https://admin.oriblax.com',
        token: {
            signInResponseTokenPointer: '/accessToken'
        },
    },
    css: ['~/assets/css/main.css'],
    postcss: {
        plugins: {
            tailwindcss: {},
            autoprefixer: {},
        },
    },
    image: {
        quality: 50,
        domains: ['nuxtjs.org'],
    },
    // colorMode: {
    //     preference: 'system', // default value of $colorMode.preference
    //     fallback: 'light', // fallback value if not system preference found
    //     // hid: 'nuxt-color-mode-script',
    //     // globalName: '__NUXT_COLOR_MODE__',
    //     // componentName: 'ColorScheme',
    //     // classPrefix: '',
    //     classSuffix: '',
    //     storageKey: 'nuxt-color-mode'
    // }
    ssr: false,
    server: {
        port: 8000, // default: 3000
        // host: '0.0.0.0' // default: localhost
    }
})
