import { createContext, useContext, useState, useEffect, Children } from 'react';
import { getAllRecipes, createRecipe, getRecipeById, deleteRecipe } from '../api/recipes';

const RecipesContext = createContext();

export const RecipesProvider = ({children}) => {
    const [recipes , setRecipes] = useState([]) ;
    const [loading , setLoading] = useState(true) ;
    const [error , setError] = useState(null) ;
    const [currentRecipe , setCurrentRecipe] = useState(null) ;

    const getRecipes = async () => {
        try{
            const data = await getAllRecipes();
            setRecipes(data)
            setError(null)
        }catch(err){
            setError(err.message)
        }
        finally{
            setLoading(false)
        }
    }
    const getRecipeId = async (id) => {
        try{
            const data = await getRecipeById(id)
            setCurrentRecipe(data)
            setError(null)
        }catch(err){
            setError(err.message)
        }finally{
            setLoading(false)
        }
    }
    const newRecipe = async (data) => {
        try{
            const newRec = await createRecipe(data);
            setRecipes([...recipes , newRec]);
            return newRec;
        }catch (err) {
          setError(err.message);
          throw err;
        }
        
    }
    const deleteRec = async (id) => {
        try{
            await deleteRecipe(id)
            setRecipes(recipes.filter(recipe => recipe.id !== id))

        }catch(err){
            setError(err.message)
            throw err ;
        }
    }
    useEffect(() => {
        getRecipes();
      }, []);
    return (
        <RecipesContext.Provider
      value={{
        recipes,
        loading,
        error,
        currentRecipe,
        getRecipes,
        getRecipeId,
        newRecipe,
        deleteRec
      }}
    >
      {children}
    </RecipesContext.Provider>
    )
}
export const useRecipes  = () => useContext(RecipesContext);