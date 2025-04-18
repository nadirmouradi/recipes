const authModel = require("../model/auth")
const db = require('../config/database')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');


const register = async (req, res) => {
  try {
    const { nom, prenom, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await authModel.createUser({
      nom,
      prenom,
      email,
      password: hashedPassword,
    });
    res.status(201).json({ message: 'User created successfully', user });
  } catch (err) {
    console.error('Error in createUserController:', err);
    res.status(500).json({ message: 'Error creating user', error: err.message });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const query = "SELECT * FROM users WHERE email = ?";
    db.execute(query, [email] , async (err , results ) => {
      if (err) {
        return res.status(500).json({ error: "Error signing in user" });
      }
  
      if (results.length === 0) {
        return res.status(401).json({ error: "Invalid email or mot de Passe" });
      }
  
      const user = results[0];
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (passwordMatch) {
  
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET , { expiresIn: "24h" });
        res.json({ token, user });
      } else {
        res.status(401).json({ error: "email ou mot de passe incorrect" });
      }
    }); 
  }catch{
    res.status(500).json({ error: "Error signing in user" });
  }
};


   
 



module.exports = {
    register,
    login

};