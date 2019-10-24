const express = require('express')
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

app.all('*', (request, response) => {
    response.sendStatus(404)
})

const server = app.listen(1337, () => { console.log('Listening in on 1337...') })

module.exports = server