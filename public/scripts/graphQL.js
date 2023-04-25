// Import GraphQL client
import { GraphQLClient, gql } from 'graphql-request'
import * as dotenv from "dotenv"

// Dotenv setup
dotenv.config()

// GraphQL Client setup
export const client = new GraphQLClient(process.env.HIGH_PERFORMANCE_API, {
    headers: {
        Authorization: `Bearer ${process.env.API_KEY}`
    }
})

/* -------------------------------------------------------------------------- */
/*                                   Queries                                  */
/* -------------------------------------------------------------------------- */

/* ------------------------------ Player query ------------------------------ */

// Get all players
export async function getPlayers(req) {

    const name = req.query.name || ""

    // GraphQL Query
    const query = gql`
        {
            players(where: {name_contains: "${name}"}) {
                id
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

/* ------------------------------- Team query ------------------------------- */

// Get all teams
export async function getTeams(req) {

    const name = req.query.name || ""

    // GraphQL Query
    const query = gql`
        {
            teams(where: {name_contains: "${name}"}) {
                name
                country
                seeding
                iso2
                iso3
                olympicCode
                players {
                    name
                    jerseyNumber
                    gender
                    height
                    pronounced
                    pronouns
                }
                facts {
                    question {
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

/* ----------------------------- Question query ----------------------------- */

// Get all questions
export async function getQuestions(req) {

    const type = req.query.type

    let query

    // Check if type is defined
    if (!type) {
        query = gql`
            {
                questions{
                    title
                    type
                }
            }
        `
    } else {
        query = gql`
            {
                questions(where: {type: ${type}}) {
                    title
                    type
                }
            }
        `
    }

    // GraphQL Request
    const data = await client.request(query)
    return data
}

/* ------------------------------- Game query ------------------------------- */

// Get game by id
export async function getGame(req) {

    const gameId = req.query.gameid

    let query

    // Check if game id is defined
    if (!gameId) {
        query = gql`
            {
                games{
                    gameId
                    field
                    broadcaster
                    division
                    gameStatus
                    team1 {
                        name
                        seeding
                        country
                    }
                    team2 {
                        name
                        seeding
                        country
                    }
                }
            }
        `
    } else{
        query = gql`
            {
                games(where: {gameId: ${gameId}}) {
                    gameId
                    field
                    broadcaster
                    division
                    gameStatus
                    team1 {
                        name
                        seeding
                        country
                    }
                    team2 {
                        name
                        seeding
                        country
                    }
                }
            }
        `
    }
    
    // GraphQL Request
    const data = await client.request(query)
    return data
}