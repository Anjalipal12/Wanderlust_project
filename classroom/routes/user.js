const express = require("express");
const router = express.Router();

//Index - users
router.get("/", (req, res) => {
    res.send("GET for users");
});

//show - users
router.get("/:id", (req, res) => {
    res.send("GET for user id");
});

//POST 
router.post("/", (req, res) => {
    res.send("POST for users");
});

//Delete 
router.delete("/:id", (req, res) => {
    res.send("DELETE for user id");
});

module.exports = router;