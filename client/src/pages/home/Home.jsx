import React, { useState } from 'react'
import  Navbar  from '../../components/common/Navbar'
import RecipeList from '../recipes/RecipeList'

const RecipesList = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilters, setActiveFilters] = useState([]);


  
  return (
    <div>
      <Navbar searchQuery={searchQuery} setSearchQuery={setSearchQuery} activeFilters={activeFilters} setActiveFilters={setActiveFilters} />
      <RecipeList searchQuery={searchQuery} activeFilters={activeFilters} />
    </div>
  )
}

export default RecipesList