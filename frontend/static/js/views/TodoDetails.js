import AbstractView from "./AbstractView.js";

class TodoDetails extends AbstractView
{
    constructor( params )
    {
        super( params );
        this.setTitle( "Todos" );
    }

    async getHtml ()
    {
        return `
            <h1>Todo Details</h1>
        `;
    }
}

export default TodoDetails;