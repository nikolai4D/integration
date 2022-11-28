import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
  constructor() {
    super();
    this.setTitle("Home");
  }

  async getHtml() {
    return `
        <h2>Welcome</h2>
        <h4>Login</h4>
        <input type="text">
        <h4>Password</h4>
        <input type="password">
        <input type="submit" value="Login">
    `;
  }
}
