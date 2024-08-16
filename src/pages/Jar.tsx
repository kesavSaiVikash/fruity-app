import React from "react";
import { useJar } from "../hooks/useJar";
import { Popup } from "../components";
import { Fruit } from "../types";

const Jar: React.FC = () => {
  const {
    totalCalories,
    addFruitToJar,
    removeFruitFromJar,
    initiateRemoveAllFruits,
    isConfirmationPopupVisible,
    confirmRemoveAllFruits,
    cancelRemoveAllFruits,
    groupedFruitsWithQuantities,
  } = useJar();

  const hasFruits = Object.keys(groupedFruitsWithQuantities).length > 0;

  return (
    <div className="page-container">
      <div className="jar-card">
        <h1 className="card-header">Your Jar</h1>
        <br />
        <div className="total-calories">Total Calories: {totalCalories}</div>

        {hasFruits && (
          <button
            onClick={initiateRemoveAllFruits}
            className="remove-all-button"
          >
            Remove All
          </button>
        )}

        <div className="list-container">
          {!hasFruits ? (
            <p className="text-gray-500 text-center text-lg font-medium mt-4">
              No fruits in your jar
            </p>
          ) : (
            <ul className="space-y-4 mt-4">
              {Object.entries(groupedFruitsWithQuantities).map(
                ([fruitName, { quantity, calories }]) => (
                  <li
                    key={fruitName}
                    className="list-item items-center justify-between"
                  >
                    <span className="list-item-text">
                      {`${fruitName} (${calories} cal) x ${quantity}`}
                    </span>
                    <div className="button-group">
                      <button
                        onClick={() =>
                          addFruitToJar({
                            name: fruitName,
                            nutritions: { calories },
                          } as Fruit)
                        }
                        className="add-button"
                      >
                        +
                      </button>
                      <button
                        onClick={() =>
                          removeFruitFromJar({
                            name: fruitName,
                            nutritions: { calories },
                          } as Fruit)
                        }
                        className="remove-button"
                      >
                        -
                      </button>
                    </div>
                  </li>
                )
              )}
            </ul>
          )}
        </div>
      </div>

      {isConfirmationPopupVisible && (
        <Popup
          message="Are you sure you want to remove all the fruits in your jar?"
          onConfirm={confirmRemoveAllFruits}
          onCancel={cancelRemoveAllFruits}
        />
      )}
    </div>
  );
};

export default Jar;
