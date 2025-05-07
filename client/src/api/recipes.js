import axios from "axios" ;

const APIURL = "http://localhost:8080/api/recipes" ;

export const getAllRecipes = async() => {
    try{
        const response = await axios.get(`${APIURL}`);
        return response.data
    } catch(err){
        throw err.response?.data?.message || 'Erreur lors de la récupération des recettes';
    }
}
export const getRecipeById = async(id) => {
    try{
        const response = await axios.get(`${APIURL}/${id}`);
        return response.data
    } catch(err){
        throw err.response?.data?.message || 'Erreur lors de la récupération des recettes';
    }
}
export const createRecipe = async(recipeData) => {
    try{
        const response = await axios.post(`${APIURL}`, recipeData , {
            headers: { 'Content-Type': 'multipart/form-data' }
        })

        return response.data
    } catch(err) {
        throw err.response?.data?.message || 'Erreur lors de la création de recette';
    }
}
export const deleteRecipe = async (id) => {
    try{
        const response = await axios.delete(`${APIURL}/${id}`)
        return response.data
    }catch(err) {
        throw err.response?.data?.message || 'Erreur lors de la suppresssion de recette';
    }

}