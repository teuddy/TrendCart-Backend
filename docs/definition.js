const swaggerJSDoc = require('swagger-jsdoc');

// Swagger configuration
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'TrendCarts.net',
      version: '1.0.0',
      description: 'API documentation for Backend Rest Api',
    },
    tags: [
      {
        name: 'Categories',
        description: 'API for categories in your application, used to group related products.',
      },
      {
        name: 'Products',
        description: 'API for products in your application',
      },
      // Add more tags for each route group here...
    ],
  },
  apis: ['./routes/category/index.js'],
};
  const swaggerDocs = swaggerJSDoc(swaggerOptions);

  

  module.exports = swaggerDocs;