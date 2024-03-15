// import
const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

//database uri
const DB_URI = "mongodb+srv://Suppa:root@recipes.xqc50iu.mongodb.net/";
const port = 3000;

mongoose.connect(DB_URI);

// user schema
const UserSchema = new mongoose.Schema({
  username: String,
  password: String,
});
const User = mongoose.model("User", UserSchema);

//contact schema
const contactSchema = new mongoose.Schema({
  name: String,
  email: String,
  query: String,
});

const Query = mongoose.model("Query", contactSchema);

// Middleware for token verification
function verifyToken(req, res, next) {
  const token = req.headers["authorization"];
  if (!token)
    return res.status(403).send("A token is required for authentication");
  try {
    req.user = jwt.verify(token.split(" ")[1], "YOUR_SECRET_KEY");
    next();
  } catch (err) {
    return res.status(401).send("Invalid Token");
  }
}

// Registration user
app.post("/registration", async (req, res) => {
  try {
    const hashedPassword = bcrypt.hashSync(req.body.password, 8);
    const user = new User({
      username: req.body.username,
      password: hashedPassword,
    });
    await user.save();
    res.status(201).send("User Registration successfull");
  } catch (error) {
    res.status(500).send("Error Registration user");
  }
});

// Login user
app.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) {
      return res.status(401).send("Invalid credentials");
    }
    if (user && bcrypt.compareSync(req.body.password, user.password)) {
      const token = jwt.sign({ userId: user._id }, "YOUR_SECRET_KEY");
      res.json({ token });
    } else {
      res.status(401).send("Invalid credentials");
    }
  } catch (error) {
    res.status(500).send("Error during login");
  }
});

// post schema
const PostSchema = new mongoose.Schema({
  userId: mongoose.Schema.Types.ObjectId,
  title: String,
  content: String,
});
const Post = mongoose.model("Post", PostSchema);

// Create a post
app.post("/createposts", verifyToken, async (req, res) => {
  try {
    const post = new Post({
      userId: req.user.userId,
      title: req.body.title,
      content: req.body.content,
    });
    await post.save();
    res.status(201).send("Post created successfully");
  } catch (error) {
    res.status(500).send("Error creating post");
  }
});

// Get all posts
app.get("/posts", verifyToken, async (req, res) => {
  try {
    const posts = await Post.find();
    res.json(posts);
  } catch (error) {
    res.status(500).send("Error fetching posts");
  }
});

// Fetch a single post
app.get("/posts/:postId", verifyToken, async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId);
    if (!post) {
      return res.status(404).send("Post not found");
    }
    res.json(post);
  } catch (error) {
    res.status(500).send("Error fetching post");
  }
});

// Update a post
app.put("/posts/:postId", verifyToken, async (req, res) => {
  try {
    const post = await Post.findOne({
      _id: req.params.postId,
      userId: req.user.userId,
    });
    if (!post) return res.status(404).send("Post not found or unauthorized");
    post.title = req.body.title;
    post.content = req.body.content;
    await post.save();
    res.status(200).send("Post updated successfully");
  } catch (error) {
    res.status(500).send("Error updating post");
  }
});

// Delete a post
app.delete("/posts/:postId", verifyToken, async (req, res) => {
  try {
    const result = await Post.findOneAndDelete({
      _id: req.params.postId,
      userId: req.user.userId,
    });
    if (!result) {
      return res.status(404).send("Post not found or unauthorized");
    }
    res.status(200).send("Post deleted successfully");
  } catch (error) {
    res.status(500).send("Error deleting post");
  }
});

// to contact us 
app.post("/contact", async (req, res) => {
  console.log("/contact called");
  try {
    const query = new Query({
      name: req.body.name,
      email: req.body.email,
      query: req.body.query,
    });
    await query.save();
    res.status(201).send("Successful");
  } catch (error) {
    res.status(500).send("Internal server error");
  }
});

app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
