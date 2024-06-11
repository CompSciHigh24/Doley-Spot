const mongoose = require("mongoose");
const ejs = require("ejs");
const express = require("express");
const app = express();

app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));

app.use(express.json());

app.use((req, res, next) => {
  console.log(`${req.method}: ${req.path}`);
  next();
});


const mongoDBConnectionString = "mongodb+srv://SE12:CSH2024@cluster0.xxcvmtz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";//1

mongoose
  .connect(mongoDBConnectionString)
  .then(() => {
    console.log("MongoDB connection successful.");
  })
  .catch((err) => console.log("MongoDB connection error:", err));

// Schema and model for School
const clothingSchema = new mongoose.Schema( {
  clothing: {type: String},
  size: {type: String, required: true},
  name: {type: String, required: true},
  color: {type: String, required:true},
  price: {type: Number, required: true},
  stock: {type: Number, required:true},
  image: {type: String, required:true}
})

const Clothes = mongoose.model("Clothes", clothingSchema)

app.get("/", (req, res) => {
  Clothes.find({})
    .then((clothes) => {
      res.render("inventory.ejs", {data: clothes});
    });
});


// Find a clothing
app.get("/clothes", (req, res) => {
  Clothes.find({})
    .then((clothes) => {
      res.render("inventory.ejs", {data: clothes});
    });
});

app.get("/admin", (req, res) => {
  Clothes.find({})
    .then((clothes) => {
      res.render("admin.ejs", {data: clothes});
    });
});


app.get("/newAddition", (req, res)=>{
  res.sendFile(__dirname + "/public/form.html")
})

app.post("/newAddition", (req, res)=>{
  const addition = new Clothes({
    clothing: req.body.clothing,
    name:req.body.name,
    size: req.body.size,
    color:req.body.color,
    price:req.body.price,
    stock:req.body.stock,
    image: req.body.image,
  })
  addition.save()
  .then((data)=>{
    res.status(200).json(data)
  })
  .catch((err)=>{
    console.log("Something went wrong here!")
    res.status(500).send("500 internal error")
  })
})

// Create a clothingItem

app.post("/clothes", (req,res)=>{
  const rdgfthj = new Clothes({
    clothing: req.body.clothing,
    size: req.body.size,
    name: req.body.name,
    color: req.body.color,
    price: req.body.price,
    stock: req.body.stock,
    image: req.body.image,
  })
    rdgfthj.save().then((clothes) => res.json(clothes));
})


app.patch("/clothes/:_id", (req, res)=>{
  const filter = {_id: req.params._id}
  const update = {$set: {name: req.body.name}}

  Clothes.findOneAndUpdate(filter, update, {new:true})
  .then((c1)=>{
    res.json(c1)
  })
})

app.delete("/clothes/:_id", (req, res)=>{
const filter = {_id: req.params._id}

  Clothes.findOneAndDelete(filter)
    .then((c1)=>{
      res.status(200).json(c1)
    })
    .catch((err)=>{
      console.log("Something went wrong here!")
      res.status(500).send("500 internal error")
    })
})

app.use((req, res, next)=>{
  res.status(404).send("ERROR CAN'T FIND PAGE")
})

app.listen(3000, () => {
  console.log("Server running on port 3000");
});


