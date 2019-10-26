const express = require('express')
const bodyParser = require('body-parser')
const teams = require('./teams.json')

const app = express()

app.get('/teams', (request, response) => {
    response.send(teams)
})

app.get('/teams/:identifier', (request, response) => {
    const identifier = request.params.identifier

    const matchingTeams = teams.filter((team) => {
        return team.id === Number(identifier) || team.abbreviation === identifier.toUpperCase()
    })

    if (matchingTeams.length) {
        response.send(matchingTeams)
    } else {
        response.sendStatus(404)
    }
})

app.use(bodyParser.json())

app.post('/teams', (request, response) => {
    const { id, location, mascot, abbreviation, conference, division } = request.body

    if (!id || !location || !mascot || !abbreviation || !conference || !division) {
        response.status(400).send('The follwing attributes are required: id, location, mascot, abbreviation, conference, division')
    }

    const newTeam = { id, location, mascot, abbreviation, conference, division }
    teams.push(newTeam)

    response.status(201).send(newTeam)
})

app.all('*', (request, response) => {
    response.sendStatus(404)
})

const server = app.listen(1337, () => { console.log('Listening in on 1337...') })

module.exports = server