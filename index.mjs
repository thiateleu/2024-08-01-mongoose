//  ================  Imports  ================
import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import db from "./db/conn.mjs";
import jsxViewEngine from "jsx-view-engine";
import methodOverride from "method-override";
import fruitRoutes from "./controllers/fruit.mjs";

//  ================ Variable declarations  ================
dotenv.config();
const app = express();
const PORT = process.env.PORT || 5050;

//  ================ Set up my view engine  ================
app.set("view engine", "jsx");
app.set("views", "./views");
app.engine("jsx", jsxViewEngine());

//  ================  Middleware  ================
// app.use(express.json());
// when I am using a form
app.use(express.urlencoded({ extended: false }));

app.use(methodOverride("_method"));

//  ================  Routes  ================
app.use("/fruits", fruitRoutes);

app.get("/", (req, res) => {
  res.send(
    `<div> this is my fruits and vegetables root route <br/><a href='/fruits'>fruits</a></div>`
  );
});

//  ================  Start my server  ================
app.listen(PORT, () => {
  console.log("server is listening");
});
