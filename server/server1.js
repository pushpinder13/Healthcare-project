// const express = require("express");
// const connectDb = require("./config/dbConnection.js");
// const errorHandler = require("./middleware/errorhandler");
// const cors = require("cors");
// const dotenv = require("dotenv").config();
// const path = require('path');
// const asyncHandler = require('express-async-handler');
// const multer = require('multer')
// const upload = multer({ dest: 'uploads/' })


// const userRoutes = require("./routes/userRoutes");
// const doctorRoutes = require("./routes/doctorRoutes");

// connectDb();
// const app = express();
// const port = process.env.PORT || 5000;

// app.use(express.json());
// app.use(cors());
// app.use(errorHandler);

// app.set('view engine', 'hbs');
// app.set('views', path.join(__dirname, 'views'));
// const hbs = require('hbs');
// hbs.registerPartials(path.join(__dirname, 'views/partials'));

// // Define your routes
// app.get('/home', (req, res) => {
//     const user = { name: "Pushpinder" };
//     res.render("home", { username: user.name });
// });

// app.get('/allusers', (req, res) => {
//     const users = [
//         { name: "Pranav", age: 30 },
//         { name: "Thakir", age: 25 },
//         { name: "SDFS", age: 28 }
//     ];
//     res.render('users', { users });
// });

// app.get('/', (req, res) => {
//     res.send("Working");
// });

// app.post('/profile', upload.single('avatar'), (req, res, next) => {


//     console.log(req.body);
//     console.log(req.file);

//     res.send('File uploaded!');
// });

// // Use routes
// app.use("/api/users", userRoutes);
// app.use('/api/doctors', doctorRoutes);

// app.listen(port, () => {
//     console.log(`Server is running on http://localhost:${port}`);
// });

const express = require("express");
const connectDb = require("./config/dbConnection.js");
const errorHandler = require("./middleware/errorhandler");
const cors = require("cors");
const dotenv = require("dotenv").config();
const path = require("path");
const asyncHandler = require("express-async-handler");
const multer = require("multer");

const upload = multer({ dest: "uploads/" });

const userRoutes = require("./routes/userRoutes");
const doctorRoutes = require("./routes/doctorRoutes");

connectDb();
const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());
app.use(errorHandler);

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "views"));
const hbs = require("hbs");
hbs.registerPartials(path.join(__dirname, "views/partials"));

app.get("/home", (req, res) => {
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

app.post("/profile", upload.single("avatar"), (req, res, next) => {
    console.log(req.body);
    console.log(req.file);

    const imageUrl = `/uploads/${req.file.filename}`;

    res.render("home", {
        username: req.body.username || "Pushpinder Singh",
        imageUrl: imageUrl,
    });
});

// Use routes
app.use("/api/users", userRoutes);
app.use("/api/doctors", doctorRoutes);

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
