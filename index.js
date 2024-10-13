const express = require("express");
const app = express();
const port = 4050;
const path = require("path");

app.use(express.urlencoded({ extended: true }));

// Setting view engine for the 'views' folder to use EJS while routing
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Serve static files from the "public" directory using express.static like style.css etc
app.use(express.static(path.join(__dirname, "public")));


//making database or array data for just make posts
let posts = [{ user: "anilydv@45", desc: "This is anil's first post" }, { user: "suniydv@77", desc: "This is sky's first post" }, { user: "rahul484", desc: "This is rahul's first post" }];
//this is index route - main page
app.get("/posts", (req, res) => {
    // res.send("server is responding well! to port 4050");
    res.render("post.ejs",{posts}); //here exporting or sending posts data
});

//to create a route where i create new post which will add to posts route 
app.get("/posts/new",(req,res)=>{
    res.render("newPost.ejs");
}) //but get shows the request to the urls so we use post instead

app.post("/posts",(req,res)=>{
    res.send("post request working!");
    // console.log(req.body);
    //using de-structing and taking input username and content in one object then push it in posts so new post create
    let {user,desc} = req.body ; 
    posts.push({user,desc});//pushed one more object so new post create in ejs
})

app.listen(port, () => {
    console.log(`App is listening on port ${port}`);
});

