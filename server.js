var express = require("express");
var path = require("path");
/* var cookieParser = require("cookie-parser"); */
/* var logger = require("bob"); */

const app = express();
const getNodes = require("./request_to_db/graphQLcall");

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

app.post("/graphql", async function (req, res, next) {
    console.log('/graphql')
  let dbResponse = await getNodes();
  console.log(dbResponse);
  console.log(response.status);
  console.log(response.data);
  res.send(dbResponse);
});

app.get("/todo", (req, res) => {
  res.sendFile(path.resolve(__dirname, "frontend", "index.html"));
});

app.listen(process.env.PORT || 4090, () =>
  console.log("server is up and running.")
);

/* 
async function apiCallPost(reqBody, url) {
  let response;

  try {
    response = await axios.post(url, reqBody, {
      withCredentials: true,
      credientials: "include",
      headers: {
        apikey: "abcdefghijklmnopqrstuvwxyz",
      },
    });

    console.log("try apiCallPost ", reqBody);
  } catch (err) {
    // Handle Error Here
    response = err.response;
    console.log("catch apiCallPost ", reqBody);
  }
  return response;
} */

/* let url = "http://localhost:3000/api/graphql";
let body = {
  query:
    "query RooterQueryType($cascadeInput: CascadeInput){\n      cascade(cascadeInput:$cascadeInput){\n      id\n      title\n      defType\n      parentId\n      updated\n      created\n      childrenNodes{\n          id\n          title\n          defType\n          parentId\n          updated\n          created\n          \n          childrenNodes{\n              id\n              title\n              defType\n              parentId\n              updated\n              created\n                          \n              childrenNodes{\n                  id\n                  title\n                  defType\n                  parentId\n                  updated\n                  created\n              }\n          }\n      }\n  }}",
  variables: {
    cascadeInput: {
      configDef: {
        id: ["cd_7277ad05-4d6a-4c64-99f5-90b5f89043fc"],
      },
      configObj: {
        id: [
          "co_3bc766cb-74b8-458a-acf0-e5202291e5cc",
          "co_4417d751-583e-46c7-b704-b066b2549acf",
        ],
      },
      typeData: {},
      instanceData: {},
    },
  },
};

async function getNodes() {
  let response = await apiCallPost(body, url);
  console.log("resp: " + JSON.stringify(response.data, null, 2));
}

getNodes(); */
