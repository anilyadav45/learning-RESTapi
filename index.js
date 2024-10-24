const express = require("express");
const { rmSync } = require("fs");
const app = express();
const port = 4050;
const path = require("path");
const MethodOverride = require("method-override");
app.use(MethodOverride("_method"));

const { v4: uuidv4 } = require('uuid');
uuidv4(); // ⇨ '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed'

app.use(express.urlencoded({ extended: true }));

// Setting view engine for the 'views' folder to use EJS while routing
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Serve static files from the "public" directory using express.static like style.css etc
app.use(express.static(path.join(__dirname, "public")));


//making database or array data for just make posts
let posts = [{ user: "anilydv@45", desc: "This is anil's first post", id: uuidv4() }, { user: "suniydv@77", desc: "This is sky's first post", id: uuidv4() }, { user: "rahul484", desc: "This is rahul's first post", id: uuidv4() }];
//here manually we added ids but in database it auto generate ind. ids
//this is index route - main page
app.get("/posts", (req, res) => {
    // res.send("server is responding well! to port 4050");
    res.render("post.ejs", { posts }); //here exporting or sending posts data
});

//to create a route where i create new post which will add to posts route 
app.get("/posts/new", (req, res) => {
    res.render("newPost.ejs");
}) //but get shows the request to the urls so we use post instead

app.post("/posts", (req, res) => {
    // res.send("post request working!");
    // console.log(req.body);
    //using de-structing and taking input username and content in one object then push it in posts so new post create
    let id = uuidv4(); //random id generate 
    let { user, desc } = req.body;
    posts.push({ user, desc, id });//pushed one more object so new post create in ejs
    //here after pushed the post there is no posts route coming so let's use redirect 
    res.redirect("http://localhost:4050/posts"); //after all the work this will auto reload posts after new form submission
})
//creating routes to access specific post through ids
app.get("/posts/:id", (req, res) => {
    let { id } = req.params;
    let post = posts.find((p) => id === p.id);
    // console.log(post);
    // res.send("id route working ");
    res.render("indivisual.ejs", { post });
})

//creating new route for edit and update the post 
app.get("/posts/:id/edit", (req, res) => {
    // res.send("edit route working");
    let { id } = req.params;
    let post = posts.find((p) => id === p.id); //this will find the post the id we got after the route so in edit ejs after rendering we can use it's content and etc
    //  console.log(post);
    res.render("edit.ejs", { post });
})

//patch route to update post details
app.patch("/posts/:id", (req, res) => {
    let { id } = req.params;
    let post = posts.find((p) => id === p.id); //finding post through id
    // let newContent = req.body.desc;  //the new content we send in body at hobbscotch
    let newDesc = req.body.desc;
    post.desc = newDesc; //the new content assing to previous desc
    console.log(post.desc);

    // console.log(newContent);
    // res.send("patch or updationwoiking");
    res.redirect("/posts");
})

// DELETE route 
app.delete("/posts/:id",(req,res)=>{
    let {id} = req.params; 
    posts = posts.filter((p)=> id != p.id); //here we're assigning the posts which is not equal to the id which will request for DELETE and the one which matches will not assign to posts so it will not visible we can call it will be removed
    //we only filtered the post which is not equal to requested id 
    //requested id post will be ignored so we can imagine it as deleted
    res.redirect("/posts"); //after ignored this post and assigned or filtered it will redirect to main page
    
})

app.listen(port, () => {
    console.log(`App is listening on port ${port}`);
});

