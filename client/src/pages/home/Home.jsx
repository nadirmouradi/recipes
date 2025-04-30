import React, { useState } from 'react'
import  Navbar  from '../../components/common/Navbar'
import RecipeList from '../recipes/RecipeList'

const RecipesList = () => {
  const [searchQuery, setSearchQuery] = useState('');

  
  return (
    <div>
      <Navbar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <RecipeList searchQuery={searchQuery} />
    </div>
  )
}

export default RecipesList