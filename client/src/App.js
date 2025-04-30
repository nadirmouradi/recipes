import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Home from './pages/home/Home';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import CreateRecipePage from './pages/recipes/CreateRecipePage';
import RecipeList from './pages/recipes/RecipeList';
import RecipeDetailPage from './pages/recipes/RecipeDetailPage';
import { RecipesProvider } from './context/RecipesContext';
import { AuthProvider } from './context/AuthContext';
import Profile from './pages/user/Profile';


const App = () => {
  return (
    <AuthProvider>
    <RecipesProvider> 
      <BrowserRouter>
        <Routes>
          <Route path="/create-recipe" element={<CreateRecipePage />} />
          <Route path="/recipes" element={<RecipeList />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<Home />} />
          <Route path="/recipe/:id" element={<RecipeDetailPage />} />
          <Route path="/profile" element={<Profile />} />          
        </Routes>
      </BrowserRouter>
    </RecipesProvider>
    </AuthProvider>
  );
};

export default App;
