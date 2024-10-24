const express = require("express");
const connectDb = require("./config/dbConnection.js");
const errorHandler = require("./middleware/errorhandler");
const cors = require("cors");
const dotenv = require("dotenv").config();
const path = require('path');

connectDb();
const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());
app.use(errorHandler);

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));
const hbs = require('hbs');
hbs.registerPartials(path.join(__dirname, 'views/partials'));

app.get('/home', (req, res) => {
    const user = { name: "Pushpinder" };
    res.render("home", { username: user.name });
});

app.get('/allusers', (req, res) => {
    const users = [
        { name: "Pranav", age: 30 },
        { name: "Thakir", age: 25 },
        { name: "SDFS", age: 28 }
    ];
    res.render('users', { users });
});

app.get('/', (req, res) => {
    res.send("Working");
});

app.use("/api/", require("./routes/userRoutes"));

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
