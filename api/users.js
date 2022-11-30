export default qureyUsers = () => {

  const qurey = JSON.stringify(
    {
      query: "query RooterQueryType($cascadeInput: CascadeInput){\n      cascade(cascadeInput:$cascadeInput){\n      id\n      title\n      defType\n      parentId\n      updated\n      created\n      childrenNodes{\n          id\n          title\n          defType\n          parentId\n          updated\n          created\n          \n          childrenNodes{\n              id\n              title\n              defType\n              parentId\n              updated\n              created\n                          \n              childrenNodes{\n                  id\n                  title\n                  defType\n                  parentId\n                  updated\n                  created\n              }\n          }\n      }\n  }}",
    variables: {
      cascadeInput: {
        configDef: {
          id: ["cd_7277ad05-4d6a-4c64-99f5-90b5f89043fc"],
        },
        configObj: {
          id: ["co_cf91c69d-bc9d-4d8d-b9ec-f854681d07ee"],
        },
        typeData: {},
        instanceData: {},
      },
    },
      varibles: {
        cascadeInput: cascadeInput,
      },
    },
    null,
    2
  );

  return graphQLQurey(qurey);
};
