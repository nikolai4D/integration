const getNodes = require( "./db" );

const express = require( "express" );
const path = require( "path" );
// const router = express.Router();

const app = express();

app.use( "/static", express.static( path.resolve( __dirname, "frontend", "static" ) ) );

app.get( "/*", ( req, res, next ) =>
{
    res.sendFile( path.resolve( __dirname, "frontend", "index.html" ) );
} );

app.post( "/db", async function ( req, res, next )
{
    let dbResponse = await getNodes();
    res.send( dbResponse );
} );

app.listen( process.env.PORT || 3060, () => console.log( "Server running..." ) );