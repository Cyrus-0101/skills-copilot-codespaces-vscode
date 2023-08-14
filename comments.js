// Create web server
// Load the express module
import express from 'express';
const app = express();
// Load the comments.json file
import comments, { push } from './comments.json';
// Load the body-parser module
import { urlencoded, json } from 'body-parser';
// Load the fs module
import { writeFile } from 'fs';
// Set the port number
const port = 3000;
// Set up the middleware
app.use(urlencoded({ extended: true }));
app.use(json());
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
    push(comment);
    // Send back the created comment
    res.json(comment);
    // Write the updated "database" to the comments.json file
    const commentsJSON = JSON.stringify(comments, null, 2);
    writeFile('comments.json', commentsJSON, err => {
        if (err) throw err;
        console.log('The data has been written to the file');
    });
});
// Start the server
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});