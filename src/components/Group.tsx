import React from "react";
import FruitItem from "./FruitItem";
import { GroupProps } from "../types";

const Group: React.FC<GroupProps> = ({
  name,
  fruits,
  isCollapsed,
  onToggle,
  onAddAll,
  onAddFruit,
}) => {
  return (
    <div className="mb-4">
      <h2 className="group-title" onClick={onToggle}>
        {name}
        <span className="group-toggle">
          {isCollapsed ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 15l7-7 7 7"
              />
            </svg>
          )}
        </span>
        <button
          onClick={(e) => {
            e.stopPropagation(); // Prevent collapsing when clicking Add All
            onAddAll();
          }}
          className="group-button"
        >
          Add all
        </button>
      </h2>
      {!isCollapsed && (
        <ul>
          {fruits.map((fruit) => (
            <FruitItem key={fruit.id} fruit={fruit} onAddFruit={onAddFruit} />
          ))}
        </ul>
      )}
    </div>
  );
};

export default Group;
