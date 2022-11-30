const axios = require("axios");

const apiCallPost = async (reqBody, url) => {
  let response;
  let password;

  try {
    response = await axios.post(url, reqBody, {
      withCredentials: true,
      credentials: "include",
      headers: {
        apikey: "abcdefghijklmnopqrstuvwxyz",
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
let body = {
  query:
    "query RooterQueryType($cascadeInput: CascadeInput){\n      cascade(cascadeInput:$cascadeInput){\n      id\n      title\n      defType\n      parentId\n      updated\n      created\n      childrenNodes{\n          id\n          title\n          defType\n          parentId\n          updated\n          created\n          \n          childrenNodes{\n              id\n              title\n              defType\n              parentId\n              updated\n              created\n                          \n              childrenNodes{\n                  id\n                  title\n                  defType\n                  parentId\n                  updated\n                  created\n              }\n          }\n      }\n  }}",
  variables: {
    cascadeInput: {
      configDef: {
        id: ["cd_6477e5a5-3f48-455b-bbbe-7c2b49711ba9"],
        /* ${password}, */
      },
      configObj: {},
      typeData: {},
      instanceData: {},
    },
  },
};

async function getNodes() {
  let response = await apiCallPost(body, url);
  console.log("test", response.data);

  return {
    status: response.status,
    data: response.data,
  };
}

module.exports = getNodes;
