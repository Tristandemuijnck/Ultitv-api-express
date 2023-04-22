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

    const name = req.query.name || "Tristan"

    // GraphQL Query
    const query = gql`
        {
            players(where: {name: "${name}"}) {
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
export async function getTeams() {
    // GraphQL Query
    const query = gql`
        {
            teams {
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
export async function getQuestions() {
    // GraphQL Query
    const query = gql`
        {
            questions {
                title
                type
            }
        }
    `

    // GraphQL Request
    const data = await client.request(query)
    return data
}