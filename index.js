const express = require('express');
const app = express();
const path = require('path');
const redditData = require('./data.json');

app.use(express.static(path.join(__dirname, '/public')));

// Set up EJS
app.set('view engine', 'ejs');
// Set up views folder so we can access it from anywhere
app.set('views', path.join(__dirname, '/views'));

app.get('/', (req, res) => {
    // We don't need to add the .ejs extension, because express assumes that we are using ejs since we set it up above in the view engine
    res.render('home.ejs');
});

app.get('/r/:subreddit', (req, res) => {
    // Remeber params is like an argument that you pass in to a function
    const { subreddit } = req.params;
    const data = redditData[subreddit];
    if (data) {
        // Spreding the data object into the render method will allow us to access all of the properties of the data object in our template
        res.render('subreddit.ejs', { ...data });
    } else {
        res.render('notfound.ejs', { subreddit });
    }

});

app.get('/rand', (req, res) => {
    const num = Math.floor(Math.random() * 10) + 1;
    // We can pass in a second argument to res.render, which is an object that contains all of the variables we want to pass to our template
    res.render('random.ejs', { rand: num });
});

app.get('/cats', (req, res) => {
    const cats = [
        'Blue', 'Rocket', 'Monty', 'Stephanie', 'Winston'
    ];
    res.render('cats.ejs', { allCats: cats });
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});