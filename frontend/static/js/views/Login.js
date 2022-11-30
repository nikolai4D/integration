import AbstractView from "./AbstractView.js";

// class Login extends AbstractView
export default class extends AbstractView
{
    constructor( params )
    {
        super( params );
        this.setTitle( "Login" );
    }

    submitHandler =  e =>
    {
        e.preventDefault();
        const email = document.getElementById( "email" ).value;
        const password = document.getElementById( "password" ).value;
        if ( email === "" || password === "" )
        {
            return;
        }
        const data = { email, password };

        const options =
        {
            method: "POST",
            headers:
            {
                "Content-Type": "application/json"
            },
            body: JSON.stringify( data )
        };

        fetch( "/db", options )
            .then( res =>
            {
                if ( res.ok )
                {
                    return res.json();
                }
                else
                {
                    return res.json().then( data =>
                    {
                        throw new Error( data.message );
                    } );
                }
            } ).then( data =>
            {
                //SUCCESSFUL REQUEST & USER IS AUTHENTICATED
                //LOGIN USER
                //REDIRECT USER TO TODOS PAGE
                console.log( data );
            } ).catch( err =>
            {
                console.log( err.message );
            } );
    };

    bindScript ()
    {
        document.getElementById( "login" ).addEventListener( "click", this.submitHandler );
    }

    async getHtml ()
    {
        return `
            <div>
                <h1>Login</h1>
                <form>
                <label for="email">Email:</label>
                <input type="email" id="email" placeholder="example@example.com" required>
                <label for="password">Password:</label>
                <input type="password" id="password" placeholder="*********" required>
                <button id="login" type="submit">Login</button>
                </form>
            </div>
            `;
    }
}

// export default Login;