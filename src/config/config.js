const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '../../.env') });

module.exports = {
  env: process.env.NODE_ENV,
  port: process.env.PORT,
  mongoose: {
    url: process.env.MONGODB_URL + (process.env.NODE_ENV === 'test' ? '-test' : ''),
    options: {
      // To avoid deprecation warnings from the MongoDB driver regarding createIndex()
      useCreateIndex: true,

      // enforces a port in your mongodb connection string
      useNewUrlParser: true,

      // Using the MongoDB driver's new connection management engine
      useUnifiedTopology: true,
    },
  },
};
