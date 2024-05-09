const express = require('express');
const cors = require('cors'); // Importez le middleware cors
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const User = require('./models/User');
const auth = require('./routes/authentification');
const panier = require('./routes/panier');
const fs = require('fs');
const path = require('path');


const app = express();

// Utilisez le middleware cors pour permettre les requêtes CORS
app.use(cors());

app.use(express.json());
app.use(session({
  secret: 'secret_key',
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(async (username, password, done) => {
  try {
    const user = await User.findOne({ where: { username } });
    if (!user) {
      return done(null, false, { message: 'Nom d\'utilisateur incorrect' });
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return done(null, false, { message: 'Mot de passe incorrect' });
    }
    return done(null, user);
  } catch (error) {
    return done(error);
  }
}));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findByPk(id);
    done(null, user);
  } catch (error) {
    done(error);
  }
});

const PORT = process.env.PORT || 5000;

// Route de récupération des produits

app.get('/produits', (req, res) => {
  try {
    // Lire le contenu du fichier produits.json
    fs.readFile(path.join(__dirname, 'Data', 'produits.json'), (err, data) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: "Erreur lors de la lecture du fichier de produits." });
      }
      // Convertir les données en objet JSON
      const produits = JSON.parse(data);
      // Renvoyer les données des produits en tant que réponse JSON
      res.json(produits);
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erreur lors de la récupération des produits." });
  }
});

app.get('/equipements', (req, res) => {
  try {
    // Lire le contenu du fichier produits.json
    fs.readFile(path.join(__dirname, 'Data', 'equipements.json'), (err, data) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: "Erreur lors de la lecture du fichier equipement." });
      }
      // Convertir les données en objet JSON
      const equipements = JSON.parse(data);
      // Renvoyer les données des produits en tant que réponse JSON
      res.json(equipements);
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erreur lors de la récupération des produits." });
  }
});



// Middleware pour vérifier l'authentification
function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/login');
}

// Autres routes
app.use('/auth', auth);
//app.use('/panier', panier);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
