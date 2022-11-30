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

let url = "http://localhost:3000/api/graphql";
let body = {
    "query": "query RooterQueryType($cascadeInput: CascadeInput){\n      cascade(cascadeInput:$cascadeInput){\n      id\n      title\n      defType\n      parentId\n      updated\n      created\n      childrenNodes{\n          id\n          title\n          defType\n          parentId\n          updated\n          created\n          \n          childrenNodes{\n              id\n              title\n              defType\n              parentId\n              updated\n              created\n                          \n              childrenNodes{\n                  id\n                  title\n                  defType\n                  parentId\n                  updated\n                  created\n              }\n          }\n      }\n  }}",
    "variables": {
        "cascadeInput": {
            "configDef": {
                "id": [
                    "cd_853647f7-df4b-4688-a294-b69f6a14a69f",
                    "cd_429fc0be-c482-4335-a28c-5e24f5d03995"
                ]
            },
            "configObj": {
                "id": [
                    "co_30a03021-5cb6-46ad-91ea-f6f112ae0e57",
                    "co_d3bd65bc-12af-412c-a8d4-21bb3ec86e50"
                ]
            },
            "typeData": {
                "id": [
                    "td_477e2adb-6419-4e4a-a319-217c61b0f6ed",
                    "td_e77cc10f-d2fe-4bc3-b298-1cf188d99685"
                ]
            },
            "instanceData": {}
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
// getNodes();

module.exports = getNodes;