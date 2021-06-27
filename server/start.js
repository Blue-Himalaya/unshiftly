const app = require('./index.js');
const https = require('https');
const fs = require('fs');
const dotenv = require('dotenv');
dotenv.config()
// app.listen(8080, () => {
//   console.log('server listening on port 8080');
// });
const options = {
  key: fs.readFileSync(process.env.SSL_KEY, 'utf8'),
  cert: fs.readFileSync(process.env.SSL_CERT, 'utf8')
};

https.createServer(options, app).listen(8080, () => {
  console.log('HTTPS Server running on port 8080');
});

