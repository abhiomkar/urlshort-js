module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: 'urlshort',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'URL Short Service' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Amaranth|Source+Sans+Pro:300,400,600' },
    ],
  },
  modules: [
    '@nuxtjs/google-analytics'
  ],
  'google-analytics': {
    id: 'UA-188760-32'
  },  
  /*
  ** Customize the progress bar color
  */
  loading: { color: '#EC427C' },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** Run ESLint on save
    */
    extend (config, ctx) {
      if (ctx.dev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  }
}
