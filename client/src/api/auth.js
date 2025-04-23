import axios from "axios" ;

const APIURL = "http://localhost:8080/api" ;

export const register = async (userData) => {
    try{
        const response = await axios.post(`${APIURL}/register`, userData);
        return response.data;
        } catch (error) {
            console.error("Erreur durant l'inscription" , error.response?.data || error.message);
            throw error;
    }
}

export const login = async (userData) => {
  try {
    const response = await axios.post(`${APIURL}/login`, userData);
    return {
      token: response.data.token,
      user: response.data.user,
    };
  } catch (error) {
    // Structure d'erreur standardisée
    throw {
      message: error.response?.data?.message || "Email ou mot de passe incorrect",
      status: error.response?.status || 401
    };
  }
};