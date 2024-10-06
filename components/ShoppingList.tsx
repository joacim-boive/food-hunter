import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from "react-beautiful-dnd";

interface ShoppingItem {
  id: string;
  name: string;
  quantity: number;
}

export default function ShoppingList() {
  const [items, setItems] = useState<ShoppingItem[]>([]);

  useEffect(() => {
    // Fetch shopping list items from the API
    fetchShoppingList();
  }, []);

  const fetchShoppingList = async () => {
    try {
      const response = await fetch("/api/shopping-list");
      if (response.ok) {
        const data = await response.json();
        setItems(data.items);
      } else {
        console.error("Failed to fetch shopping list");
      }
    } catch (error) {
      console.error("Error fetching shopping list:", error);
    }
  };

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const newItems = Array.from(items);
    const [reorderedItem] = newItems.splice(result.source.index, 1);
    newItems.splice(result.destination.index, 0, reorderedItem);

    setItems(newItems);
  };

  const handleSaveOrder = async () => {
    try {
      const response = await fetch("/api/shopping-list", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ items }),
      });

      if (response.ok) {
        console.log("Shopping list order saved successfully");
      } else {
        console.error("Failed to save shopping list order");
      }
    } catch (error) {
      console.error("Error saving shopping list order:", error);
    }
  };

  return (
    <div className='space-y-4'>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId='shopping-list'>
          {(provided) => (
            <ul
              {...provided.droppableProps}
              ref={provided.innerRef}
              className='space-y-2'
            >
              {items.map((item, index) => (
                <Draggable key={item.id} draggableId={item.id} index={index}>
                  {(provided) => (
                    <li
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className='bg-white p-4 rounded shadow flex justify-between items-center'
                    >
                      <span>{item.name}</span>
                      <span className='text-gray-600'>
                        Qty: {item.quantity}
                      </span>
                    </li>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </ul>
          )}
        </Droppable>
      </DragDropContext>
      <Button onClick={handleSaveOrder}>Save Order</Button>
    </div>
  );
}
