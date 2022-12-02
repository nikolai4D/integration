import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
  constructor(params) {
    super(params);
    this.setTitle("Todo");
  }

  createElement = (e) => {
    e.preventDefault();

    if (document.getElementById("user-input").value === "" || null) {
      return;
    }

    const userInput = document.getElementById("user-input");
    const userDateInput = document.getElementById("date");
    const getDiv = document.getElementById("my-list");
    const listItem = document.createElement("li");
    const dateItem = document.createElement('li')

    dateItem.setAttribute('id', 'user-date')
    listItem.setAttribute("id", "to-do-list");

    getDiv.appendChild(listItem);
    getDiv.appendChild(dateItem)

    listItem.innerHTML = 'Task: ' + userInput.value
    dateItem.innerHTML = 'Date: ' + userDateInput.value;

    console.log(userInput.value);
    console.log(userDateInput.value);
  };

  bindScript() {
    document
      .getElementById("add-task")
      .addEventListener("click", this.createElement);
  }

  async getHtml() {
    return `
    <div>
        <h1>To-do list</h1>
        <p>Task</p>
        <input id="user-input" type='text'/>
        <p>Task due</p>
        <input id="date" type='date'/>
        <input id="add-task" type='submit' value='Add task'/>
    </div>
    `;
  }
}
