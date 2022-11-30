import AbstractView from "./AbstractView.js";
// import TodoItem from "../components/TodoItem.js";

export default class extends AbstractView
{
    constructor( params )
    {
        super( params );
        this.setTitle( "Todos" );
    }

    addTodo (e)
    {
        e.preventDefault();
        if ( document.getElementById( "todo" ).value === "" || null )
        {
            return;
        }

        const todoWrapper = document.getElementById( "todoWrapper" );
        const todo = document.createElement( "div" );
        const todoParagraph = document.createElement( "p" );
        todoParagraph.innerHTML = document.getElementById( "todo" ).value;
        todoWrapper.appendChild( todo );
        todo.appendChild( todoParagraph );
    }

    bindScript ()
    {
        document.getElementById( "todoSubmit" ).addEventListener( "click", this.addTodo );
    }

    async getHtml ()
    {
        return `
            <h1>Todos</h1>
            <div>
                <form>
                    <label for="todo">New Todo:</label>
                    <input id="todo" required type="text">
                    <button id="todoSubmit" type="submit">Add</button>
                </form>
            </div>
            <div id=todoWrapper>
            </div>
        `;
    }
}

// export default Todos;