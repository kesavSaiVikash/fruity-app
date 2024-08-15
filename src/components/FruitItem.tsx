import React from "react";
import { FruitItemProps } from "../types";

const FruitItem: React.FC<FruitItemProps> = ({ fruit, onAddFruit }) => {
  return (
    <li className="fruit-item">
      <span>{`${fruit.name} (${fruit.nutritions.calories} cal)`}</span>
      <button onClick={() => onAddFruit(fruit)} className="add-button">
        Add
      </button>
    </li>
  );
};

export default FruitItem;
