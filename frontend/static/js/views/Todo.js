import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
  constructor(params) {
    super(params);
    this.setTitle("Todo");
  }

  createQuery = async (task, date) => {
    {
      let response;
      /* let task = document.getElementById("user-input").value;
      let date = document.getElementById("date").value; */
      console.log("task and date", task + date);
      try {
        response = await fetch(`/create/task`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            task,
            date,
          }),
        });
        console.log("this is the task:", task);
        console.log(date);

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
    document.getElementById("add-task").addEventListener("click", async () => {
      /*let response = await this.graphQLQuery();
console.log("test");

      console.log("status from server response: ", response.status);
      if (response.status !== 200) {
        console.log(response.status);
      } else {
        console.log(response);
      } */

      const task = document.getElementById("user-input");
      const date = document.getElementById("date");
      const getDiv = document.getElementById("my-list");
      const listItem = document.createElement("li");
      const dateItem = document.createElement("li");

      dateItem.setAttribute("id", "user-date");
      listItem.setAttribute("id", "to-do-list");

      getDiv.appendChild(listItem);
      getDiv.appendChild(dateItem);
      getDiv.appendChild(dateItem);

      listItem.innerText = "Task: " + task.value;
      dateItem.innerText = "Date: " + date.value;
      const res = await this.createQuery(task.value);

      console.log("last stand", res);
      /* console.log("last stand 22", JSON.stringify(response)); */
    });
  };

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
} /*  + response[0].data.data.nodes[11].title; */

/* row 42  

 createElement = (e) => {
    e.preventDefault();

    if (document.getElementById("user-input").value === "" || null) {
      return;
    }

    const task = this.task
    const date = document.getElementById("date");
    const getDiv = document.getElementById("my-list");
    const listItem = document.createElement("li");
    const dateItem = document.createElement("li");

    dateItem.setAttribute("id", "user-date");
    listItem.setAttribute("id", "to-do-list");

    getDiv.appendChild(listItem);
    getDiv.appendChild(dateItem);
    getDiv.appendChild(dateItem);

    listItem.innerText = "Task: " + task;
    dateItem.innerText = "Date: " + date;

    console.log(this.task);
    console.log(userDateInput.value);
  };
 */

/*  inside bindScript()
  
  
  const theTask = document.createElement("p");
      theTask.setAttribute("id", "task");
      document.body.appendChild(theTask);
      theTask.innerText = "Task: " + theTask;
      console.log('the task', theTask)

      const theDate = document.createElement("p");
      theDate.setAttribute("id", "date");
      document.body.appendChild(theDate);
      theDate.innerText =
        "Date: ";  */
