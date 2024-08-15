import { useAtom } from "jotai";
import { useState, useCallback, useMemo } from "react";
import { jarFruitsAtom, totalCaloriesAtom } from "../state/jarAtoms";
import { Fruit } from "../types";

export const useJar = () => {
  // Atom states for fruits in the jar and total calories
  const [jarFruits, setJarFruits] = useAtom(jarFruitsAtom);
  const [totalCalories, setTotalCalories] = useAtom(totalCaloriesAtom);

  // State for managing the visibility of the confirmation popup
  const [isConfirmationPopupVisible, setIsConfirmationPopupVisible] =
    useState(false);

  // Utility function to update the quantity of a fruit in the jar
  const updateFruitQuantity = useCallback(
    (fruit: Fruit, increment: boolean) => {
      setJarFruits((prevFruits) => {
        const updatedFruits = prevFruits
          .map((f) =>
            f.name === fruit.name
              ? {
                  ...f,
                  quantity: increment
                    ? f.quantity + fruit.quantity
                    : f.quantity - fruit.quantity,
                }
              : f
          )
          .filter((f) => f.quantity > 0);

        return increment && !updatedFruits.some((f) => f.name === fruit.name)
          ? [...updatedFruits, fruit]
          : updatedFruits;
      });

      setTotalCalories((prevCalories) =>
        increment
          ? prevCalories + fruit.nutritions.calories
          : prevCalories - fruit.nutritions.calories
      );
    },
    [setJarFruits, setTotalCalories]
  );

  // Functions to handle adding and removing fruits
  const addFruitToJar = useCallback(
    (fruit: Fruit) => updateFruitQuantity({ ...fruit, quantity: 1 }, true),
    [updateFruitQuantity]
  );

  const addGroupOfFruitsToJar = useCallback(
    (groupFruits: Fruit[]) => groupFruits.forEach(addFruitToJar),
    [addFruitToJar]
  );

  const removeFruitFromJar = useCallback(
    (fruit: Fruit) => updateFruitQuantity({ ...fruit, quantity: 1 }, false),
    [updateFruitQuantity]
  );

  // Functions to handle the removal of all fruits from the jar
  const initiateRemoveAllFruits = useCallback(() => {
    setIsConfirmationPopupVisible(true);
  }, []);

  const confirmRemoveAllFruits = useCallback(() => {
    setJarFruits([]);
    setTotalCalories(0);
    setIsConfirmationPopupVisible(false);
  }, [setJarFruits, setTotalCalories]);

  const cancelRemoveAllFruits = useCallback(() => {
    setIsConfirmationPopupVisible(false);
  }, []);

  // Memoized value for grouping fruits by their names with quantities and calories
  const groupedFruitsWithQuantities = useMemo(() => {
    return jarFruits.reduce<
      Record<string, { quantity: number; calories: number }>
    >((acc, fruit) => {
      if (!acc[fruit.name]) {
        acc[fruit.name] = { quantity: 0, calories: 0 };
      }
      acc[fruit.name].quantity += fruit.quantity;
      acc[fruit.name].calories = fruit.nutritions.calories;
      return acc;
    }, {});
  }, [jarFruits]);

  return {
    jarFruits,
    totalCalories,
    isConfirmationPopupVisible,
    addFruitToJar,
    addGroupOfFruitsToJar,
    removeFruitFromJar,
    initiateRemoveAllFruits,
    confirmRemoveAllFruits,
    cancelRemoveAllFruits,
    groupedFruitsWithQuantities,
  };
};
