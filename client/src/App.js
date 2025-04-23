import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

// import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/home/Home';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
// import { AuthProvider } from './context/AuthContext';
// import RecipeForm from './components/recipes/RecipeForm';
import CreateRecipePage from './pages/recipes/CreateRecipePage';
import RecipeList from './pages/recipes/RecipeList';
import RecipeDetailPage from './pages/recipes/RecipeDetailPage';


const App = () => {
  return (
 //   <AuthProvider>
      <BrowserRouter>
        <Routes>
        <Route path="/form" element={<CreateRecipePage />} />
        <Route path="/recipes" element={<RecipeList />} />

        
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/"
            element={
              
                <Home />
            
            }
          />
          <Route path="/recipe/:id" element={<RecipeDetailPage />} />

        </Routes>
      </BrowserRouter>
//    </AuthProvider>
      );
};

export default App;
