//this file will be moved to a correct directory by Jan
//it is for a temporary preview of how DBahn API works

const createClient = require('hafas-client')
const dbProfile = require('hafas-client/p/db')
const { router } = require('../app')

// create a client with the Deutsche Bahn profile
const client = createClient(dbProfile, 'my-awesome-program')

const res = await client.journeys('8011167', '8000261', {results: 1})
console.log(res)


// //router.get ..
// //client.joureys



// // async function route() {
// const departureId = await.client.locations(-station-)[0].id
// const arrivalId = 


// }