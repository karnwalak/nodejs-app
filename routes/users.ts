import { NextFunction, Request, Response } from "express";
import addUser from "../controllers/user-controller/addUser";
import login from "../controllers/user-controller/login";
import editUser from "../controllers/user-controller/editUser";

var express = require("express");
var router = express.Router();

/* GET users listing. */
router.get("/", function (req: Request, res: Response, next: NextFunction) {
  res.send("respond with a resource");
});

router.post("/login", login);
router.post("/register", addUser);
router.post("/:id", editUser);

module.exports = router;
