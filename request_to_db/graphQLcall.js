const axios = require("axios");
require("dotenv").config();
const apiCallPost = async (reqBody, url) => {
  let response;

  let apikey = process.env.API_KEY;
  console.log("apikey:", apikey);
  try {
    response = await axios.post(url, reqBody, {
      withCredentials: true,
      credentials: "include",
      headers: {
        apikey: process.env.API_KEY,
      },
    });

    console.log("try apiCallPost ", reqBody);
  } catch (err) {
    response = err.response;
    console.log("catch apiCallPost ", reqBody);
  }
  return response;
};

let createUrl = "http://localhost:3000/api/type/create";
let bodyPOST = (task) => {
  /* let createTask = document.getElementById("user-input").value; */
  console.log("creating MY TASK", task);

  return {
    title: task,
    props: [],
    parentId:
      "co_04ca0a35-df26-4385-922c-d89faba9821f",
  };
};

/* source: "td_e3df4b95-c259-4a21-9537-9114b191f4cd",
    target: "td_ffc1d8d3-fa2b-43c7-9f28-6b42c4d03e88", */

let url = "http://localhost:3000/api/graphql";
let body = (input) => {
  return {
    query: `query RooterQueryType($input:QueryInput){
      nodes(itemInput:$input){
      id
      title
      defType
      parentId
      props {
          key
          value
      }
      propKeys
      typeDataPropKeys
      instanceDataPropKeys
      updated
      created
    }
  }`,
    variables: {
      input: { title: input },
    },
  };
};

async function createNodes(input) {
  let createBody = bodyPOST(input);
  console.log("please work", createUrl);
  console.log("plssssssss", createBody);
  let response = await apiCallPost(createBody, createUrl);
  console.log("getting tasks: ", response);

  return {
    status: response.status,
    data: response.data,
  };
}

async function getNodes(input) {
  let setBody = body(input);
  let response = await apiCallPost(setBody, url);
  console.log("test", response.data);

  return {
    status: response.status,
    data: response.data,
  };
}

module.exports = { getNodes, createNodes, bodyPOST };
