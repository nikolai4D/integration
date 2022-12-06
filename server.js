const { log } = require("console");
var express = require("express");

var path = require("path");
/* var cookieParser = require("cookie-parser"); */
/* var logger = require("bob"); */

const app = express();
const {getNodes} = require("./request_to_db/graphQLcall");
const {createNodes} = require("./request_to_db/graphQLcall");

/* app.use(logger("dev")); */
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
/* app.use(cookieParser()); */
app.use(express.static(path.join(__dirname, "frontend")));

app.use(
  "/static",
  express.static(path.resolve(__dirname, "frontend", "static"))
);

app.get("/*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "frontend", "index.html"));
});

app.post("/create/task", async function (req, res, next) {
  let task = req.body.task;
  console.log("req body", req.body);
  let date = req.body.date;
  console.log("added task: ", task);
  let dbResponse = await createNodes(req.body.task);
  /* let getTask = await createNodes(req.body.task) */

  /*  let createTask = [dbResponse, getTask]; */

  console.log(dbResponse.data);

  res.send(dbResponse);
});

app.post("/graphql", async function (req, res, next) {
  let username = req.body.username;
  let password = req.body.password;
  console.log("username :", username);
  console.log("password: ", password);
  console.log("/graphql");
  let dbResponse = await getNodes(req.body.username);
  let getPassword = await getNodes(req.body.password);

  let bigResp = [dbResponse, getPassword];
  console.log("get password: ", getPassword);

  res.send(bigResp);
});

app.get("/todo", (req, res) => {
  res.sendFile(path.resolve(__dirname, "frontend", "index.html"));
});

app.listen(process.env.PORT || 4090, () =>
  console.log("server is up and running.")
);
