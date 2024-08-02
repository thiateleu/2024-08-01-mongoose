import express from "express";
const router = express.Router();
import Fruit from "../models/fruit.mjs";
import db from "../db/conn.mjs";

// These are my routes
// We are going to create 7 RESTful routes
// There is an order to create them listed in your code
// I - N - D - U - C - E - S
// Action       HTTP Verb   CRUD functionality
// I - Index    GET (all)   READ - display a list of element
// N - New      GET         CREATE - (a) this is a view that allows user input
// D - Delete   DELETE      DELETE
// U - Update   PUT/PATCH   UPDATE - (b) this updates our database
// C - Create   POST        CREATE - (a) this adds to our database
// E - Edit     GET         UPDATE - (b) but this allows for the user input
// S - Show     GET         READ - display a specific element

// define a seed route
router.get("/seed", async (req, res) => {
  try {
    await Fruit.create([
      {
        name: "grapefruit",
        color: "pink",
        readyToEat: true,
      },
      {
        name: "grape",
        color: "purple",
        readyToEat: false,
      },
      {
        name: "cantelope",
        color: "orange",
        readyToEat: true,
      },
    ]);
    res.status(200).redirect("/fruits");
  } catch (e) {
    res.status(400).send(e);
  }
});

// I - Index    GET (all)   READ - display a list of element
router.get("/", async (req, res) => {
  try {
    const foundFruits = await Fruit.find({});
    res.status(200).render("fruits/Index", { fruits: foundFruits });
    // res.status(200).send(foundFruits);
    // ***** if this were a true api, this would respond with json *****
    // res.status(200).json(foundFruits);
  } catch (e) {
    res.status(400).send(e);
  }
});

// N - New      GET         CREATE - (a) this is a view that allows user input
router.get("/new", (req, res) => {
  res.render("fruits/New");
  // ***** if this were a true api, this would not be here *****
  // the user/client would just use the create route (router.post) and
  // they would be responsible for updating the body correctly
});

// D - Delete   DELETE      DELETE
router.delete("/:id", async (req, res) => {
  try {
    const deletedFruit = await Fruit.findByIdAndDelete(req.params.id);
    console.log(deletedFruit);
    res.status(200).redirect("/fruits");
    // ***** if this were a true api, this would respond with json *****
    // res.status(200).json(deletedFruit);
  } catch (e) {
    res.status(400).send(e);
  }
});

// U - Update   PUT/PATCH   UPDATE - (b) this updates our database
router.put("/:id", async (req, res) => {
  // I need to handle the checkbox and make sure that value is a boolean
  if (req.body.readyToEat === "on") {
    req.body.readyToEat = true;
  } else {
    req.body.readyToEat = false;
  }
  // console.log(req.body);

  try {
    const updatedFruit = await Fruit.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    console.log(updatedFruit);
    res.redirect(`/fruits/${req.params.id}`);
    // ***** if this were a true api, this would respond with json *****
    // res.status(200).json(updatedFruits);
  } catch (e) {
    res.status(400).send(e);
  }
});

// C - Create   POST        CREATE - (a) this adds to our database
// I am starting with my POST route so that I can see the things in my database
router.post("/", async (req, res) => {
  // I need to handle the checkbox and make sure that value is a boolean
  if (req.body.readyToEat === "on") {
    req.body.readyToEat = true;
  } else {
    req.body.readyToEat = false;
  }
  console.log(req.body);

  try {
    const createdFruit = await Fruit.create(req.body);
    // this was me checking before I had my views
    // res.send(createdFruit);
    res.status(200).redirect("/fruits");
    // ***** if this were a true api, this would respond with json *****
    // res.status(200).json(createdFruit);
  } catch (e) {
    res.status(400).send(e);
  }
});

// E - Edit     GET         UPDATE - (b) but this allows for the user input
router.get("/:id/edit", async (req, res) => {
  try {
    const foundFruit = await Fruit.findById(req.params.id);
    //res.send(foundFruit);
    res.status(200).render("fruits/Edit", { fruit: foundFruit });
    // ***** if this were a true api, this would not be here *****
    // the user/client would just use the update route (router.put) and
    // they would be responsible for updating the body correctly
  } catch (e) {
    res.status(400).send(e);
  }
});

// S - Show     GET         READ - display a specific element
router.get("/:id", async (req, res) => {
  try {
    const foundFruit = await Fruit.findById(req.params.id);
    //        res.send(`this is the show page for the fruit with id: ${req.params.id}`);
    res.render("fruits/Show", { fruit: foundFruit });
    // ***** if this were a true api, this would not be here *****
    // res.status(200).json(foundFruit);
  } catch (e) {
    res.status(400).send(e);
  }
});

export default router;
