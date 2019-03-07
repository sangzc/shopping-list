const express = require("express");
const router = new express.Router();
const items = require('../fakeDb')
const ExpressError = require('../expressError');
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

/** GET a single item by its name */

router.get("/:name", function(req, res, next) {
    try {
      let name = req.params.name;
      let foundItem = items.find(item => item.name === name);
      if(foundItem === undefined){
        throw new ExpressError("item not found",404);
      }
      return res.json(foundItem);
    } catch(err) {
        next(err)
    }
});

/** Patch modify item by name or name and price */

router.patch("/:name", function(req, res, next) {
    try {
      let name = req.params.name;
      let foundItem = items.find(item => item.name === name);
      let newName = req.body.name;
      let newPrice = req.body.price;
      if(foundItem === undefined){
        throw new ExpressError("item not found",404);
      }
      if(newName !== undefined){
        foundItem.name = newName;
      }
      if(newPrice !== undefined){
        foundItem.price = newPrice;
      }
      return res.json(foundItem);
    } catch(err) {
        next(err)
    }
});

/** DELETE /users/[id]: delete user, return status */


router.delete("/:name", function(req, res, next) {
    try {
      let name = req.params.name;
      let foundItem = items.find(item => item.name === name);
      if(foundItem === undefined){
        throw new ExpressError("item not found",404);
      }
      let removeIndex = items.map( item => item.name).indexOf(name);
      let removedItem = items.splice(removeIndex,1);
      return res.json(items);

    } catch(err) {
        next(err)
    }
  return res.json();
});

module.exports = router;