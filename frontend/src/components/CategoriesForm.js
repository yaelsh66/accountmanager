import React, { useState } from 'react';
import axios from 'axios';

const CategoriesForm = ({ onCategoryAdded }) => {
  const [category_name, setName] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!category_name) return;

    try {
      const response = await axios.post('http://localhost:8000/api/categories/', { category_name });
      onCategoryAdded(response.data); // Callback to update parent list
      setName('');
    } catch (err) {
      console.error('Error adding category:', err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={category_name}
        onChange={(e) => setName(e.target.value)}
        placeholder="New Category"
      />
      <button type="submit">Add</button>
    </form>
  );
};

export default CategoriesForm;
