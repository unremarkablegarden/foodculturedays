// This is where project configuration and plugin options are located.
// Learn more: https://gridsome.org/docs/config

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`

module.exports = {
  siteName: 'FOODCULTURE days',
  siteDescription: 'Description',

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
		}
  ]
}
