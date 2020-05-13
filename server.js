const express = require("express");
const app = express();
const path = require('path');
const open = require('opn');

const   DIST_DIR = path.join(__dirname, 'dist'),
        HTML_FILE = path.join(DIST_DIR, 'index.html');

// serve static files in dist folder
app.use(express.static(DIST_DIR));

//By default send home page
app.get('*', (req, res) => {
    res.send(HTML_FILE);
});


const PORT = process.env.port || 8080;

// start listening port and opened browser
app.listen(PORT, () => {
    console.log('Server has been started on port ' + PORT);
    open('http://localhost:' + PORT)
    console.log(HTML_FILE);
});

