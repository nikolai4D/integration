import StringToHtml from "../helpers/stringToHtmlEl.js";
import AbstractView from "./AbstractView.js";
import router from "../index.js";

export default class extends AbstractView {
  constructor() {
    super();
    this.setTitle("Home");
  }


  graphQLQuery = async (query = {})=> {
    {
      let response
      try {
        response = await fetch(`/graphql`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(query),
        });
        if (!response.ok) {
          throw new Error(`HTTP error ${response.status}`)
        }
      } catch (error) {
        console.log(error);
      }
      return await response.json();
    }
  }

  bindScript = ()=> {
    document
      .getElementById("submit")
      .addEventListener("click", async ()=> {
        let response = await this.graphQLQuery()
        console.log("status from server response: ", response.status);
        console.log(response)

        let contechResponse = response.data;

        console.log("status from contech response: ", contechResponse.status);
        console.log("data from contech response: ", contechResponse.data);
      });
  }

  async getHtml() {
    return `
    <div>
        <div class='center'>
            <h2>Welcome</h2>
            <h4>Login</h4>
            <input id='email' type="text">
            <h4>Password</h4>
            <input id='password' type="password">
            <button id="submit">Submit</button>
        </div>
    </div>
    `;
    /* const element = StringToHtml(login);
    element.querySelector("input").addEventListener("click", {}); */
  }
}

  // async function  graphQLQuery(query = {}) {
  //   {
  //     let response
  //     try {
  //       response = await fetch(`/graphql`, {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify(query),
  //       });
  //       if (!response.ok) {
  //         throw new Error(`HTTP error ${response.status}`)
  //       }
  //     } catch (error) {
  //       console.log(error);
  //     }
  //     return await response.json();
  //   }
  // }
