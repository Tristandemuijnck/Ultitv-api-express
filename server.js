import express, { Router } from "express"
import bodyParser from "body-parser"
import fs from "fs"
import * as dotenv from "dotenv"

// Import GraphQL client
import { GraphQLClient, gql } from 'graphql-request'

// Dotenv setup
dotenv.config()

// Server setup
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

// GraphQL Client setup
const client = new GraphQLClient(process.env.HIGH_PERFORMANCE_API, {
    headers: {
        Authorization: `Bearer ${process.env.API_KEY}`
    }
})

// Get all players
async function getPlayers() {

    // GraphQL Query
    const query = gql`
        {
            players {
                name
                jerseyNumber
                gender
                team {
                    name
                }
                height
                pronounced
                pronouns
                facts {
                    question{
                        title
                    }
                    answer
                }
            }
        }
    `

    // GraphQL Request
    const data = await client.request(query)
    return data
}

// getPlayers().catch((error) => { console.error(error) })

// Routes
server.get("/", async (req, res) => {
    res.render("index")
})


server.get("/players", async (req, res) => {

    const data = await getPlayers()

    res.json(data)
})