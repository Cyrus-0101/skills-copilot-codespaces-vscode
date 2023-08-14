// Create a web server
// Load the express module
const express = require('express');
const app = express();
// Load the comments.json file
const comments = require('./comments.json');
// Load the body-parser module
const bodyParser = require('body-parser');
// Load the fs module
const fs = require('fs');
// Set the port number
const port = 3000;
// Set up the middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// Set up the CORS
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    next();
});
// Set up the GET request handler for the /comments endpoint
app.get('/comments', (req, res) => {
    res.json(comments);
});
// Set up the POST request handler for the /comments endpoint
app.post('/comments', (req, res) => {
    // Get the comment from the request body
    const comment = req.body;
    // Add the comment to the "database"
    comments.push(comment);
    // Send back the created comment
    res.json(comment);
    // Write the updated "database" to the comments.json file
    const commentsJSON = JSON.stringify(comments, null, 2);
    fs.writeFile('comments.json', commentsJSON, err => {
        if (err) throw err;
        console.log('The data has been written to the file');
    });
});
// Start the server
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});