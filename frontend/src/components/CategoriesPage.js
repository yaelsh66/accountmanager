// src/components/CategoriesPage.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CategoriesForm from './CategoriesForm';

const CategoriesPage = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    // Fetch existing categories from backend
    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/categories/');
        setCategories(response.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  const handleCategoryAdded = (newCategory) => {
    setCategories((prev) => [...prev, newCategory]);
  };

  return (
    <div>
      <h2>Categories</h2>
      <CategoriesForm onCategoryAdded={handleCategoryAdded} />
      <ul>
        {categories.map((cat) => (
          <li key={cat.id}>{cat.category_name}</li>
        ))}
      </ul>
    </div>
  );
};

export default CategoriesPage;
