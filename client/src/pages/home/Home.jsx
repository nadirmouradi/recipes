import React from 'react'
import  Navbar  from '../../components/common/Navbar'
import RecipeList from '../recipes/RecipeList'
const RecipesList = () => {
  return (
    <div>
      <Navbar />
      <RecipeList />
    </div>
  )
}

export default RecipesList