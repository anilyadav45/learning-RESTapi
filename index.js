const express = require("express");
const app = express();
const port = 4050;
const path = require("path");

app.use(express.urlencoded({ extended: true }));

// Setting view engine for the 'views' folder to use EJS while routing
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Serve static files from the "public" directory using express.static
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
    // res.send("server is responding well! to port 4050");
    res.render("helo.ejs");
});

app.listen(port, () => {
    console.log(`App is listening on port ${port}`);
});
