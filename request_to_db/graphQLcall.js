const axios = require("axios");
require("dotenv").config();
const apiCallPost = async (reqBody, url) => {
  let response;
  let username = reqBody.username;
  let password = reqBody.password;
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

async function getNodes(input) {
  let setBody = body(input);
  let response = await apiCallPost(setBody, url);
  console.log("test", response.data);

  return {
    status: response.status,
    data: response.data,
  };
}

module.exports = getNodes;
