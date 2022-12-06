import StringToHtml from "../helpers/stringToHtmlEl.js";
import AbstractView from "./AbstractView.js";
import router from "../index.js";
import { navigateTo } from "../index.js";

export default class extends AbstractView {
  constructor() {
    super();
    this.setTitle("Home");
  }

  graphQLQuery = async (query = {}) => {
    {
      let username = document.getElementById("email").value;
      let password = document.getElementById("password").value;

      let response;
      try {
        response = await fetch(`/graphql`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username,
            password,
          }),
        });
        console.log(username);
        console.log(password);
        /* Doesn't do anything, yet...
         if (username && password === undefined) {
          alert("not ok");
        }
         */

        if (response.ok) {
          console.log(`Status ${response.status}`);
          return response.json();
        } else {
          throw new Error(`HTTP error ${response.status}`);
        }
      } catch (error) {
        console.log(error);
      }

      return await response.json();
    }
  };

  bindScript = () => {
    document.getElementById("submit").addEventListener("click", async () => {
      let response = await this.graphQLQuery();
      console.log("status from server response: ", response.status);
      if (response.status !== 200) {
        console.log(response.status);
      } else {
        console.log(response[0].status);
        console.log(response[0].data);
      }
      console.log("username:", response[0].data.data.nodes[0]?.title);
      console.log("password:", response[1].data.data.nodes[0]?.title);

      console.log('ED:', response)

      const user = response[0].data.data.nodes[0]?.title;
      const password = response[1].data.data.nodes[0]?.title;

      if (
        document.getElementById("email").value === user &&
        document.getElementById("password").value === 
        password
      ) {
        navigateTo('/todo')
      } else if(user !== password ||
      password !== user) {
        alert('ajabaja')
      }
      else {
        alert("wrong username or password");
      }

      console.log("status from contech response: ", response.status);
      console.log("data from contech response: ", response.data);
    });
  };

  async getHtml() {
    return `
    <div>
        <div class='center'>
            <h2>Welcome</h2>
            <input id='email' placeholder="username" type="text">
            <input id='password' placeholder="password" type="password">
            <div>
              <button id="submit">Login</button>
            </div>
        </div>
    </div>
    `;
  }
}
