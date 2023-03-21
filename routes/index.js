const express = require("express");
const serverResponses = require("../utils/helpers/responses");
const messages = require("../config/messages");
const { Todo } = require("../models/todos/todo");


//one

const routes = (app) => {
  const router = express.Router();

  router.get('/melon',(req,res)=>{
    res.json({
      nam:'teuddy',
      age: 26
    })
  })
  //create
  router.post("/todos", (req, res) => {
    const todo = new Todo({
      text: req.body.text,
    });

    todo
      .save()
      .then((result) => {
        serverResponses.sendSuccess(res, messages.SUCCESSFUL, result);
      })
      .catch((e) => {
        serverResponses.sendError(res, messages.BAD_REQUEST, e);
      });
  });
   //get all
  router.get("/", (req, res) => {
    Todo.find({}, { __v: 0 })
      .then((todos) => {
        res.json(todos)
        // serverResponses.sendSuccess(res, messages.SUCCESSFUL, todos);
      })
      .catch((e) => {
        serverResponses.sendError(res, messages.BAD_REQUEST, e);
      });
  });

  //it's a prefix before api it is useful when you have many modules and you want to
  //differentiate b/w each module you can use this technique
  app.use("/api", router);
};
module.exports = routes;
