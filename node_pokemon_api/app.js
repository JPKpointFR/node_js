const express = require("express")
const morgan = require('morgan')
const favicon = require('serve-favicon')
const sequelize = require('./src/db/sequelize')
const bodyParser = require("body-parser")



const app = express()
const port = 6670

app
    .use(favicon(__dirname + "/favicon.ico"))
    .use(morgan("dev"))
    .use(bodyParser.json())


sequelize.initDb()

// Endpoints...
require("./src/routes/login")(app)
require("./src/routes/findAllPokemons")(app)
require("./src/routes/findPokemonByPk")(app)
require("./src/routes/createPokemon")(app)
require("./src/routes/updatePokemon")(app)
require("./src/routes/deletePokemon")(app)

// Gestion d'erreur 404
app.use(({ res }) => {
    const message = "impossible de trouvée la ressource demandée ! Essayer une autre URL"
    res.status(404).json({ message })
})


app.listen(port, () => console.log(`app: http://localhost:${port}`)) 