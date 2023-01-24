const mongoose = require('mongoose');

// Utilisation de dotenv
const dotenv = require('dotenv');
dotenv.config();
const MONGO_USERNAME = process.env.MONGO_USERNAME;
const MONGO_PASSWORD = process.env.MONGO_PASSWORD;
const MONGO_CLUSTER_URL = process.env.MONGO_CLUSTER_URL;

// Connection à la base de données MongoDB
mongoose.connect((`mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_CLUSTER_URL}`),
    { useNewUrlParser: true,
    useUnifiedTopology: true })
        .then(() => console.log('Connexion à MongoDB réussie !'))
        .catch(() => console.log('Connexion à MongoDB échouée !'));
;

module.exports = mongoose;