import axios from "axios" ;

const APIURL = "http://localhost:8080/api/comments" ;

export const getAllCommentsForRecipe = async (id) => {
    try {
        const response = await axios.get(`${APIURL}/${id}`)
        return response.data
    }catch(err){
        throw err.response.data.message
    }
}
export const addComment = async (comment) => {
    try{
        const response = await axios.post(`${APIURL}`, comment)
        return response.data

    }catch(err){
        throw err.response.data.message
    }
}
export const deleteComment = async (id) => {
    try{
        const response = await axios.delete(`${APIURL}/${id}`)
        return response.data
    }catch(err){
        throw err.response.data.message
    }
} 