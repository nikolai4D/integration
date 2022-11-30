const express = require("express");
const getNodes = require("./request_to_db/graphQLcall");
const app = express.Router();

app.get('/', () => (req,res,next) = () =>{
    res.render('index', {title:
    'Express'})
})

app.post('/graphql', () => async (req, res, next) =>{
    let contechRes = await getNodes()
    res.send(contechRes)
} )

module.exports = app