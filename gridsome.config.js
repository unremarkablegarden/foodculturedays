// This is where project configuration and plugin options are located.
// Learn more: https://gridsome.org/docs/config

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`

// var path = require('path')

// const tailwind = require('tailwindcss')
// const purgecss = require('@fullhuman/postcss-purgecss')

// const postcssPlugins = [
	// tailwind(),
// ]

// if (process.env.NODE_ENV === 'production') postcssPlugins.push(purgecss(require('./purgecss.config.js')))

module.exports = {
  siteName: 'Foodculture days',
  siteDescription: "a space for critical reflexion and a platform for knowledge exchange / un espace de réflexion critique et une plateforme d'échange de connaissances",

  // chainWebpack (config) {
  //   config.mode('development')
  // },

  // css: {
  //   loaderOptions: {
  //       postcss: {
  //           plugins: postcssPlugins,
  //       },
  //   },
  // },

  // css: {
  //   loaderOptions: {
  //     sass: {
  //       includePaths: ["node_modules"]
  //     }
  //   }
  // },

  // configureWebpack: {
  //   resolve: {
  //     alias: {
  //       "pixi": path.resolve('node_modules', 'pixi.js/dist/pixi.min.js')
  //     }
  //   },
  // },

  plugins: [
    {
      use: "gridsome-source-graphql-prismic",
      options: {
        // url: "https://foodculturedays.prismic.io",
        url: "https://foodculturedays2020.prismic.io",
        fieldName: 'prismic',
        typeName: 'prismic',
        headers: {
          'Prismic-Ref': ``, // useMasterRef will overload this line
          'Authorization': `Token `,
        },
        useMasterRef: true // undefined by default
      }
    },
    {
			use: 'gridsome-plugin-pug',
			options: {
				pug: { /* Options for `pug-plain-loader` */ },
				pugLoader: { /* Options for `pug-loader` */ }
			}
    },
    {
      use: "gridsome-plugin-htaccess",
    },
    // {
    //   use: 'gridsome-plugin-tailwindcss',
    // }
  ]
}
