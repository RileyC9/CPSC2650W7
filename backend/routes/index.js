import express from "express";
import { notes } from "../presistence.js"

const router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Yay node!", notes: notes()});
});
export default router;
