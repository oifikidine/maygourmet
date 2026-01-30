// On importe le framework Express
// Express permet de créer un serveur web facilement
const express = require('express')

// On importe le module "path" de Node.js
// Il sert à gérer les chemins de fichiers (Windows, Mac, Linux)
const path = require('path')

// On crée l'application Express
// "app" représente notre application web
const app = express()

// je précise que les vues sont dans le dossier views
app.set('views', './views' );

// Jje précise que nous utilision EJD pour les vues
app.set('view engine', 'ejs');

// Route GET : quand on tape une URL précise dans le navigateur
// Ici : http://localhost:3085/api/accueil
app.get('/api/accueil', (req, res) => {

    console.log("Je passe dans /api/accueil");
 
  res.render('accueil');
});

app.get('/api/equipe', (req,res) => {
    console.log("je passe dans /api/accueil");

    res.render('equipe');
});

app.get('/api/plat', (req,res) => {
    console.log("Je passe dan /api/plat");

    res.render('plat');
});

app.get('/api/contact', (req,res,) => {
    console.log("Je passe dans /api/contact");

    res.render('contact');
    
});

// On exporte l'application pour pouvoir l'utiliser ailleurs
// (dans serveur.js)
module.exports = app
