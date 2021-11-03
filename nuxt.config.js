import tr from 'vuetify/src/locale/tr'
import en from 'vuetify/src/locale/en'

export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,
  env: {
    baseURL:
      process.env.NODE_ENV === 'development'
        ? 'http://localhost:3000/api'
        : 'https://organicity.herokuapp.com/api'
  },
  // Backend Node Server
  serverMiddleware: [
    { path: "/api", handler: "~/backend/controller.js" },
  ],
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'OrganiCity',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: 'stylesheet',
        href:
          'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons'
      }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    "~/assets/css/main.css",
    "~/assets/fonts/logo-font.css",
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~/plugins/request-interceptor.js',
    '~/plugins/persisted-state.js',
    '~/plugins/internationalization.js',
    '~/plugins/util.js',
    '~/plugins/toaster.js'
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
  ],

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    lang: {
      locales: { tr, en },
      current: 'tr',
    },
    theme: {
      dark: true,
      themes: {
        light: {
          primary: "#2DBD9C",
          //   secondary: "#eeeeed",
          //   accent: "#ff5722",
          //   error: "#ff9800",
          //   warning: "#ffeb3b",
          //   info: "#03a9f4",
          //   success: "#4caf50"
        },
        dark: {
          primary: "#2DBD9C",
          //   accent: colors.grey.darken3,
          //   secondary: colors.amber.darken3,
          //   info: colors.teal.lighten1,
          //   warning: colors.amber.base,
          //   error: colors.deepOrange.accent4,
          //   success: colors.green.accent3
        }
      }
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  }
}
