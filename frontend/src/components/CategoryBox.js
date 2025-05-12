import React from "react";
import { Droppable, Draggable } from "@hello-pangea/dnd";

const CategoryBox = ({ categories }) => {
  return (
    <div className="w-40 p-2 border rounded shadow bg-gray-50">
      <h3 className="text-sm font-bold mb-2">Hidden Categories</h3>
      <Droppable droppableId="box">
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={`space-y-1 min-h-[50px] ${
              snapshot.isDraggingOver ? "bg-blue-100" : ""
            }`}
          >
            {categories.map((cat, index) => (
              <Draggable key={cat} draggableId={cat} index={index}>
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className="bg-white p-1 rounded shadow border"
                  >
                    {cat}
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default CategoryBox;
