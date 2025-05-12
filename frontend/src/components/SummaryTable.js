import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  DragDropContext,
  Droppable,
  Draggable
} from "@hello-pangea/dnd";
import CategoryBox from "./CategoryBox";

const SummaryTable = () => {
  const [summaryData, setSummaryData] = useState({});
  const [categories, setCategories] = useState([]);
  const [averages, setAverages] = useState({});
  const [visibleCategories, setVisibleCategories] = useState([]);
  const [hiddenCategories, setHiddenCategories] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8000/api/summary/").then((res) => {
      const { data, categories, averages } = res.data;
      setSummaryData(data);
      setCategories(categories);
      setVisibleCategories(categories);
      setAverages(averages);
    });
  }, []);

  const handleDragEnd = (result) => {
    if (!result.destination) return;
    const source = result.source.droppableId;
    const dest = result.destination.droppableId;
    const item = result.draggableId;

    if (source === dest) return;

    if (source === "table" && dest === "box") {
      setVisibleCategories((prev) => prev.filter((cat) => cat !== item));
      setHiddenCategories((prev) => [...prev, item]);
    }

    if (source === "box" && dest === "table") {
      setHiddenCategories((prev) => prev.filter((cat) => cat !== item));
      setVisibleCategories((prev) => [...prev, item]);
    }
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className="flex gap-4">
        <div className="overflow-x-auto">
          <table className="min-w-full border">
            <thead>
              <tr>
                <th className="border p-2">Month</th>
                {visibleCategories.map((cat, index) => (
                  <th key={cat} className="border p-2">
                    <Droppable droppableId="table" direction="horizontal">
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.droppableProps}
                          className="flex"
                        >
                          <Draggable draggableId={cat} index={index}>
                            {(provided) => (
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                className="p-2 border"
                              >
                                {cat}
                              </div>
                            )}
                          </Draggable>
                          {provided.placeholder}
                        </div>
                      )}
                    </Droppable>
                  </th>
                ))}
                <th className="border p-2">Total</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(summaryData).map(([month, values]) => {
                const total = visibleCategories.reduce(
                  (sum, cat) => sum + (values[cat] || 0),
                  0
                );
                return (
                  <tr key={month}>
                    <td className="border p-2">{month}</td>
                    {visibleCategories.map((cat) => {
                      const val = values[cat] || 0;
                      const avg = averages[cat] || 0;
                      const bg = val > avg ? "bg-red-100" : "";
                      return (
                        <td className={`border p-2 ${bg}`} key={cat}>
                          {val.toFixed(2)}
                        </td>
                      );
                    })}
                    <td className="border p-2 font-bold">
                      {total.toFixed(2)}
                    </td>
                  </tr>
                );
              })}
              <tr className="font-semibold bg-gray-200">
                <td className="border p-2">Average</td>
                {visibleCategories.map((cat) => (
                  <td key={cat} className="border p-2">
                    {averages[cat]?.toFixed(2)}
                  </td>
                ))}
                <td className="border p-2"></td>
              </tr>
            </tbody>
          </table>
        </div>
        <CategoryBox categories={hiddenCategories} />
      </div>
    </DragDropContext>
  );
};

export default SummaryTable;
