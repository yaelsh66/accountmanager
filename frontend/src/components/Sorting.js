import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  DragDropContext,
  Droppable,
  Draggable
} from '@hello-pangea/dnd';

function Expenses() {
  const [expenses, setExpenses] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchExpenses();
    fetchCategories();
  }, []);

  const fetchExpenses = () => {
    axios.get('http://localhost:8000/api/sorting/')
      .then(res => setExpenses(res.data))
      .catch(err => console.error('Error fetching expenses:', err));
  };

  const fetchCategories = () => {
    axios.get('http://localhost:8000/api/categories/')
      .then(res => setCategories(res.data))
      .catch(err => console.error('Error fetching categories:', err));
  };

  const handleDragEnd = (result) => {
    const { source, destination, draggableId, type } = result;

    // If dropped outside
    if (!destination) return;

    // Reordering categories
    if (type === 'category') {
      const items = Array.from(categories);
      const [moved] = items.splice(source.index, 1);
      items.splice(destination.index, 0, moved);
      setCategories(items);
      return;
    }

    // Assigning expense to a category
    const categoryMatch = destination.droppableId.match(/^category-(\d+)$/);
    if (categoryMatch) {
      const newCategoryId = parseInt(categoryMatch[1]);
      const expenseId = parseInt(draggableId);

      axios.patch(`http://localhost:8000/api/expenses/${expenseId}/`, {
        category: newCategoryId
      })
      .then(fetchExpenses)
      .catch(err => console.error('Failed to update expense category:', err));
    }
  };

  return (
    <div style={{ display: 'flex', padding: 20, gap: 40 }}>
      <DragDropContext onDragEnd={handleDragEnd}>

        {/* Expenses Column */}
        <div style={{ flex: 1 }}>
          <h2>Expenses</h2>
          <Droppable droppableId="expenses" isDropDisabled={true}>
            {(provided) => (
              <ul {...provided.droppableProps} ref={provided.innerRef} style={{ listStyle: 'none', padding: 0 }}>
                {expenses.filter(e => !e.category).map((expense, index) => (
                  <Draggable key={expense.id} draggableId={String(expense.id)} index={index}>
                    {(provided) => (
                      <li
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        style={{
                          padding: 10,
                          marginBottom: 8,
                          backgroundColor: '#f0f0f0',
                          borderRadius: 4,
                          ...provided.draggableProps.style
                        }}
                      >
                        {expense.description || JSON.stringify(expense)}
                      </li>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </ul>
            )}
          </Droppable>
        </div>

        {/* Categories Column */}
        <div style={{ flex: 1 }}>
          <h2>Categories</h2>
          <Droppable droppableId="category-list" type="category">
            {(provided) => (
              <ul {...provided.droppableProps} ref={provided.innerRef} style={{ listStyle: 'none', padding: 0 }}>
                {categories.map((category, index) => (
                  <Draggable key={category.id} draggableId={`cat-${category.id}`} index={index}>
                    {(provided) => (
                      <li ref={provided.innerRef} {...provided.draggableProps}>
                        <div
                          {...provided.dragHandleProps}
                          style={{
                            fontWeight: 'bold',
                            marginBottom: 5,
                            background: '#d0e0ff',
                            padding: 10,
                            borderRadius: 4
                          }}
                        >
                          {category.category_name}
                        </div>
                        <Droppable droppableId={`category-${category.id}`} >
                          {(provided) => (
                            <ul
                              ref={provided.innerRef}
                              {...provided.droppableProps}
                              style={{
                                border: '1px dashed #999',
                                borderRadius: 4,
                                padding: 10,
                                minHeight: 50,
                                marginBottom: 20
                              }}
                            >
                              {expenses.filter(e => e.category === category.id).map((expense, i) => (
                                <Draggable key={expense.id} draggableId={String(expense.id)} index={i}>
                                  {(provided) => (
                                    <li
                                      ref={provided.innerRef}
                                      {...provided.draggableProps}
                                      {...provided.dragHandleProps}
                                      style={{
                                        padding: 10,
                                        marginBottom: 8,
                                        backgroundColor: '#f5f5f5',
                                        borderRadius: 4,
                                        ...provided.draggableProps.style
                                      }}
                                    >
                                      {expense.description || JSON.stringify(expense)}
                                    </li>
                                  )}
                                </Draggable>
                              ))}
                              {provided.placeholder}
                            </ul>
                          )}
                        </Droppable>
                      </li>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </ul>
            )}
          </Droppable>
        </div>

      </DragDropContext>
    </div>
  );
}

export default Expenses;
