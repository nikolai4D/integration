import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
  constructor(params) {
    super(params);
    this.setTitle("Todo");
  }

  bindScript() {}

  async getHtml() {
    return `
    <div>
        <h1>To-do list</h1>
        <p>Task</p>
        <input type='text'/>
        <p>Task due</p>
        <input type='date'/>
        <input type='submit' value='Add task'/>
    </div>
    `;
  }
}
