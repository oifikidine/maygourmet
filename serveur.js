// On importe le module HTTP de Node.js
// Il permet de créer un serveur réseau
const http = require('http')

// On importe notre application Express
// qui se trouve dans app.js
const app = require('./app')

// On définit le numéro de port
// Le port est comme une "porte" d'entrée du serveur
const numeroPort = 3085

// On associe le port à l'application
app.set('port', numeroPort)

// On crée le serveur HTTP
// Il utilisera l'application Express pour répondre aux requêtes
const serveur = http.createServer(app)

// On démarre le serveur
// Il écoute sur le port 3085
serveur.listen(numeroPort, () => {
  console.log(
    "Le serveur de MayGourmet est à l'écoute sur le port",
    numeroPort
  )
});
