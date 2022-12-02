const axios = require( "axios" );

async function apiCallPost ( reqBody, url )
{
    let response;

    try
    {
        response = await axios.post( url, reqBody, {
            withCredentials: true,
            credientials: "include",
            headers: {
                apikey: process.env.DB_API_KEY,
            },
        } );

        console.log( "try apiCallPost ", reqBody );
    } catch ( err )
    {
        // Handle Error Here
        response = err.response;
        console.log( "catch apiCallPost ", reqBody );
    }
    return response;
}

let url = "http://localhost:3000/api/object/create";
let body = {
    "query": "query RooterQueryType($cascadeInput: CascadeInput){\n      cascade(cascadeInput:$cascadeInput){\n      id\n      title\n      defType\n      parentId\n      updated\n      created\n      childrenNodes{\n          id\n          title\n          defType\n          parentId\n          updated\n          created\n          \n          childrenNodes{\n              id\n              title\n              defType\n              parentId\n              updated\n              created\n                          \n              childrenNodes{\n                  id\n                  title\n                  defType\n                  parentId\n                  updated\n                  created\n              }\n          }\n      }\n  }}",
    "variables": {
        "cascadeInput": {
            "configDef": {
              "id": [
                "cd_117bfef3-6108-4925-a071-dccce9c4bd34",
                "cd_40e9d78b-1912-4061-be9e-39f3223291d0"
              ]
            },
            "configObj": {
              "id": [
                "co_82a4bae2-acf7-42b9-9696-b27a20548867",
                "co_d0c09dea-3e68-458b-8001-e96723e6b2d9"
              ]
            },
            "typeData": {
              "id": [
                "td_5aa021eb-9273-400d-a4b0-7644b451c4f4",
                "td_d96543ac-dea5-41e4-94aa-5653442c1f34",
                "td_4757d246-8202-429a-af18-60e265cf03c9",
                "td_b720d1b7-75f7-4d6f-9914-53433c69b4ac",
                "td_53a9c076-51cb-4aa3-8e3e-c66b3412e4cc"
              ]
            },
            "instanceData": {
              "id": [
                "id_fb831d7d-3bc8-495f-892d-7870e78520d4",
                "id_55c74b7d-aad2-440d-8c28-ee942ca2844d"
              ]
            }
        }
    }
};

async function getNodes ()
{
    console.log( "getNodes" );
    let response = await apiCallPost( body, url );
    return {
        status: response.status,
        data: response.data,
    };
    // console.log( "resp: " + JSON.stringify( response.data, null, 2 ) );
}

module.exports = getNodes;