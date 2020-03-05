// This is where project configuration and plugin options are located.
// Learn more: https://gridsome.org/docs/config

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`

module.exports = {
  siteName: 'Foodculture days',
  siteDescription: "a space for critical reflexion and a platform for knowledge exchange / un espace de réflexion critique et une plateforme d'échange de connaissances",

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
    // {
    //   use: 'gridsome-plugin-tailwindcss',
    // }
  ]
}
