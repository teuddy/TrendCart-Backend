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
      {
        name: 'Users',
        description: 'Api for users, create, profile, update users details',
      },
      {
        name: 'Payments',
        description: 'charge users for the products then create the order',
      },
      {
        name: 'Reviews',
        description: 'let users review products',
      },
      // Add more tags for each route group here...
    ],
    
  },
  apis: ['./routes/user/index.js','./routes/category/index.js','./routes/product/index.js','./routes/review/index.js','./routes/payment/index.js'],
};
  const swaggerDocs = swaggerJSDoc(swaggerOptions);
//
  

  module.exports = swaggerDocs;