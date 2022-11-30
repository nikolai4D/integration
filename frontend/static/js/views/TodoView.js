import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
  constructor(params) {
    super(params);
    this.setTitle("Viewing Todo's");
  }

  async getHtml() {
    console.log(this.params.id)
    return `
    <form>
        <h1>To-do list</h1>
        <p>Task</p>
        <input type='text'/>
        <p>Task due</p>
        <input type='date'/>
        <input type='submit' value='Add task'/>
    </form>
    `;
  }
}
