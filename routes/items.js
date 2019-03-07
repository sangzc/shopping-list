const express = require("express");
const router = new express.Router();
const items = require('../fakeDb')

const users = [];

/** GET /users: get list of users */

router.get("/", function(req, res, next) {
    try {
        return res.json(items);
    } catch(err) {
        next(err)
    }
});

/** POST /users: accepts JSON data, add it to shopping list */

router.post("/", function(req, res, next) {
    try {
        let name = req.body.name;
        let price = req.body.price;
        let newItem = {name, price};
        items.push(newItem);
        return res.json(newItem);
      } catch(err) {
        next(err)
    }
});

/** DELETE /users/[id]: delete user, return status */

router.get("/:name", function(req, res, next) {
    try {
      let name = req.params.name;
      let foundItem = items.find(item => item.name === name);
      return res.json(foundItem);
    } catch(err) {
        next(err)
    }
});

/** DELETE /users/[id]: delete user, return status */

router.get("/", function(req, res, next) {
    try {

      return res.json();
    } catch(err) {
        next(err)
    }
});

/** DELETE /users/[id]: delete user, return status */


router.get("/", function(req, res, next) {
    try {

    } catch(err) {
        next(err)
    }
  return res.json();
});

module.exports = router;