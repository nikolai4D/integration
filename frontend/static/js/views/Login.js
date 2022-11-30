import AbstractView from "./AbstractView.js";

import { navigateTo } from "../index.mjs";


// class Login extends AbstractView
export default class extends AbstractView
{
    constructor( params )
    {
        super( params );
        this.setTitle( "Login" );
        this.mode = "Register";
    }
    submitHandler = e =>
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
                data.isAuthorized = true;
                //LOGIN USER
                //REDIRECT USER TO TODOS PAGE
                navigateTo( "/todos" );
                console.log( data );
            } ).catch( err =>
            {
                console.log( err.message );
            } );
    };

    bindScript ()
    {
        document.getElementById( "actionBtn" ).addEventListener( "click", this.submitHandler );
        document.getElementById( "modeSwitch" ).addEventListener( "click", this.modeSwitch );
    }
    // mode = "Register";
    modeSwitch = () =>
    {
        //login/register screen variables
        let switchBtn = document.getElementById( "modeSwitch" );
        let title = document.getElementById( "title" );
        let actionBtn = document.getElementById( "actionBtn" );
        if ( this.mode === "Register" )
        {
            //we switched to login mode
            this.mode = "Login";
            switchBtn.innerHTML = `Switch to ${ this.mode }`;

            title.innerText = "Register";
            actionBtn.innerText = "Register";
        }
        else if ( this.mode === "Login" )
        {
            //we switched to register mode
            this.mode = "Register";
            switchBtn.innerHTML = `Switch to ${ this.mode }`;

            title.innerText = "Login";
            actionBtn.innerText = "Login";
        }
        // this.mode = mode;
    };

    async getHtml ()
    {
        return `
            <div>
                <h1 id="title">Login</h1>
                <form>
                <label for="email">Email:</label>
                <input type="email" id="email" placeholder="example@example.com" required>
                <label for="password">Password:</label>
                <input type="password" id="password" placeholder="*********" required>
                <button id="modeSwitch" type="button">Switch to ${ this.mode }</button>
                <button id="actionBtn" type="submit">Login</button>
                </form>
            </div>
            `;
    }
}

// export default Login;