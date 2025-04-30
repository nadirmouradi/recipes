import React , {useState } from 'react';
import { Link , useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
const Register = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const { register } = useAuth(); // Ajoutez les parenthèses
  const [errors, setErrors] = useState({});
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };
  const validateForm = () => {
    const newErrors = {};

    if (!formData.firstName.trim()) newErrors.firstName = 'Prénom est obligatoire.';
    if (!formData.lastName.trim()) newErrors.lastName = 'Nom est obligatoire.';
    if (!formData.email.trim()) {
      newErrors.email = 'Email est obligatoire.';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email invalide.';
    }
    if (!formData.password) {
      newErrors.password = 'Mot de passe est obligatoire.';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Le mot de passe doit contenir au moins 6 caractères.';
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Les mots de passe ne correspondent pas.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const Navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      try {
        const transformedData = {
          nom: formData.firstName,
          prenom: formData.lastName,
          email: formData.email,
          password: formData.password,
        };
        await register(transformedData);
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          password: '',
          confirmPassword: '',
        });
        setErrors({});
      } catch (error) {
        console.error("Error registering user:", error.response?.data || error.message);
        setErrors({ apiError: "Failed to register. Please try again later." });
      }
    }
  };
  
 
  return (
    <div className="flex h-screen">
      <div className="w-1/2 flex flex-col justify-center items-center bg-gray-100 p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Inscription</h1>
        <form className="w-3/4" onSubmit={handleSubmit}>
          <div className="flex space-x-4 mb-4">
            <div className="w-1/2">
              <label htmlFor="firstName" className="block text-gray-700 font-semibold mb-2">
                Prénom
              </label>
              <input
                type="text"
                id="firstName"
                placeholder="Votre prénom"
                value={formData.firstName}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
              {errors.firstName && <p className="text-red-500 text-sm">{errors.firstName}</p>}

            </div>
            <div className="w-1/2">
              <label htmlFor="lastName" className="block text-gray-700 font-semibold mb-2">
                Nom
              </label>
              <input
                type="text"
                id="lastName"
                placeholder="Votre nom"
                value={formData.lastName} 
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
              {errors.lastName && <p className="text-red-500 text-sm">{errors.lastName}</p>}
            </div>
          </div>

          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 font-semibold mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="Votre email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
          </div>

          <div className="flex space-x-4 mb-6">
            <div className="w-1/2">
              <label htmlFor="password" className="block text-gray-700 font-semibold mb-2">
                Mot de passe
              </label>
              <input
                type="password"
                id="password"
                placeholder="Votre mot de passe"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
              {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
            </div>
            <div className="w-1/2">
              <label htmlFor="confirmPassword" className="block text-gray-700 font-semibold mb-2">
                Confirmer le mot de passe
              </label>
              <input
                type="password"
                id="confirmPassword"
                placeholder="Confirmer le mot de passe"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
              {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword}</p>}
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-primary text-white py-2 px-4 rounded-lg hover:bg-orange-200 transition duration-300"
          >
            S'inscrire
          </button>
        </form>
          <div className="mt-4 text-center">
          <p className="text-gray-600">
            Vous avez déjà un compte ?
            <Link to="/login" className="text-primary hover:underline">
              Connectez-vous ici
            </Link>
          </p>
        </div>
      </div>

      <div className="w-1/2 flex justify-center items-center">
        <img src="assets/food.jpg" alt="Logo" className="w-full h-full object-cover" />
      </div>
    </div>
  );
};

export default Register;
