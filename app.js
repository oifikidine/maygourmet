// On importe le framework Express
// Express permet de créer un serveur web facilement
const express = require('express');

// j'importe le pilote Mysql2 utilisé pour interroger la BDD MySQL
const mysql2 = require("mysql2");

//j'importe le pilote express-myConnection utilisé pour se connecter à la BDD
const myConnection = require('express-myconnection');

// On importe le module "path" de Node.js
// Il sert à gérer les chemins de fichiers (Windows, Mac, Linux)
const path = require('path')

// On crée l'application Express
// "app" représente notre application web
const app = express();

// je configure les éléments attendus pour me connecter à la base de donnee
const optionsConnexionBaseDeDonnees = {
    host: "localhost",
    user: "root",
    password: "Dembouzeur976",
    database: "maygourmet",
    port: 3306,
};

/*Middleware pour se connecter à la BDD Mysql
"pool" est la stratégie de connexion à la base de données  MySQL
*/
app.use(myConnection(mysql2, optionsConnexionBaseDeDonnees, "pool"));

// je précise que les vues sont dans le dossier views
app.set('views', './views' );

// Jje précise que nous utilision EJD pour les vues
app.set('view engine', 'ejs');

// je précise que j'utilise le dossier 'public' qui contient les fichiers statics
app.use(express.static("public"));

// Route GET : quand on tape une URL précise dans le navigateur
// Ici : http://localhost:3085/api/accueil
app.get('/api/accueil', (req, res) => {

    console.log("Je passe dans /api/accueil");
 
  res.render('accueil');
})

app.get('/api/equipe', (req,res) => {
    console.log("je passe dans /api/accueil");

    //1. Je meconnecte à la base de donnée à la méthodeonnection()
    req.getConnection((erreur,connection) => {
        if(erreur) { // je vérifie s'il ya une erreur lors de la connexion à la bdd
            console.log(erreur);
        } else {
            connection.query("SELECT * FROM equipe", [], (err,resultatEquipe) => {
                if (err) {
                    console.log("Erreur dans la requête SQL SELECT: ", err);
                } else {
                    console.log("Mon équipe : ", resultatEquipe);

                    // je retourne au client le résultat de la requête SQL
                    res.render("equipe", {resultatEquipe});
                }
            });
        }
    });

    // res.render('equipe');
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
