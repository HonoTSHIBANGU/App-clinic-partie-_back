// // Importez Express
// const express = require('express');
// const router = express.Router();
// // Importez le module 'fs' pour la lecture de fichiers
// const fs = require('fs');

// // Définir la route pour récupérer tous les produits
// router.get('/produits', (req, res) => {
//   try {
//     // Lire le contenu du fichier produits.json
//     fs.readFile('Data/produits.json', (err, data) => {
//       if (err) {
//         console.error(err);
//         return res.status(500).json({ message: "Erreur lors de la lecture du fichier de produits." });
//       }
//       // Convertir les données en objet JSON
//       const produits = JSON.parse(data);
//       // Renvoyer les données des produits en tant que réponse JSON
//       res.json(produits);
//     });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Erreur lors de la récupération des produits." });
//   }
// });

// // Exportez le routeur
// module.exports = router;
