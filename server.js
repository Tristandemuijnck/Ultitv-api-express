import express, { Router } from "express"
import bodyParser from "body-parser"
import fs from "fs"
import { getPlayers, getQuestions, getTeams } from './public/scripts/graphQL.js'

/* -------------------------------------------------------------------------- */
/*                               Server settings                              */
/* -------------------------------------------------------------------------- */

const server = express();

server.set("view engine", "ejs")
server.set("views", "./views")
server.set("port", process.env.PORT || 8000)

server.use(express.static("public"))
server.use(bodyParser.json())
server.use(bodyParser.urlencoded({extended: true}))

server.listen(server.get("port"), () => {
    console.log(`Application started on http://localhost:${server.get("port")}`)
})

/* -------------------------------------------------------------------------- */
/*                                   Routes                                   */
/* -------------------------------------------------------------------------- */

// Index route
server.get("/", async (req, res) => {
    res.render("index")
})

// Players route
server.get("/players", async (req, res) => {
    const data = await getPlayers()

    res.json(data)
})

// Teams route
server.get("/teams", async (req, res) => {
    const data = await getTeams()
    
    res.json(data)
})

// Questions route
server.get("/questions", async (req, res) => {
    const data = await getQuestions()

    res.json(data)
})