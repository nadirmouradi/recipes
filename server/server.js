const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes"); 
const recipeRoutes = require("./routes/recipeRoutes"); 
const commentRoutes = require("./routes/commentRoutes"); 
const favoriteRoutes = require('./routes/favoriteRoutes'); 



require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());

app.use('/api', authRoutes);
app.use('/api/recipes', recipeRoutes); 
app.use('/api/comments', commentRoutes);
app.use('/api/favorites', favoriteRoutes);
const path = require('path');
// app.js
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));



const port = process.env.PORT;

app.listen(port, () => {
  console.log(`Serveur connecté à http://localhost:${port}`);
});

