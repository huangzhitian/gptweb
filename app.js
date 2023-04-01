// Import necessary packages
const express = require('express'); // Express framework
const path = require('path'); // Node.js path module
const bodyParser = require('body-parser'); // Body parsing middleware
const basicAuth = require('express-basic-auth')
const openAIProxy = require('./api/index')
// Create an instance of the Express application
const app = express();



const auth_password = process.env.SITE_PASSWORD || '';
// 使用基本身份验证中间件
if (auth_password !== '') {
  app.use(basicAuth({
    users: { 'admin' : auth_password },
    challenge: true,
    realm: 'GPT Web',
  }))
}

// Set the port number for the application to listen on
const port = process.env.PORT || 9000;

app.use('/v1/chat/completions', openAIProxy);

// Use body-parser middleware to parse request bodies
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Serve static files from the public folder
app.use(express.static(path.join(__dirname, 'public')));

// Serve the index.html file for the root URL
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start the Express application
app.listen(port, () => {
  console.log(`App listening on port ${port}!`);
});