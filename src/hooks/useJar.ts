import { useAtom } from "jotai";
import { useState, useCallback, useMemo } from "react";
import { jarFruitsAtom, totalCaloriesAtom } from "../state/jarAtoms";
import { Fruit } from "../types";

export const useJar = () => {
  const [jarFruits, setJarFruits] = useAtom(jarFruitsAtom);
  const [totalCalories, setTotalCalories] = useAtom(totalCaloriesAtom);
  const [isConfirmationPopupVisible, setIsConfirmationPopupVisible] =
    useState(false);

  // Update fruit quantity and total calories
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

  // Handle fruit operations
  const addFruitToJar = useCallback(
    (fruit: Fruit) => updateFruitQuantity({ ...fruit, quantity: 1 }, true),
    [updateFruitQuantity]
  );

  const addGroupOfFruitsToJar = useCallback(
    (groupFruits: Fruit[]) =>
      groupFruits.forEach((fruit) => addFruitToJar(fruit)),
    [addFruitToJar]
  );

  const removeFruitFromJar = useCallback(
    (fruit: Fruit) => updateFruitQuantity({ ...fruit, quantity: 1 }, false),
    [updateFruitQuantity]
  );

  // Handle removal of all fruits
  const initiateRemoveAllFruits = useCallback(
    () => setIsConfirmationPopupVisible(true),
    []
  );

  const confirmRemoveAllFruits = useCallback(() => {
    setJarFruits([]);
    setTotalCalories(0);
    setIsConfirmationPopupVisible(false);
  }, [setJarFruits, setTotalCalories]);

  const cancelRemoveAllFruits = useCallback(
    () => setIsConfirmationPopupVisible(false),
    []
  );

  // Memoized grouped fruits with quantities
  const groupedFruitsWithQuantities = useMemo(() => {
    return jarFruits.reduce<
      Record<string, { quantity: number; calories: number }>
    >((acc, fruit) => {
      if (!acc[fruit.name]) {
        acc[fruit.name] = { quantity: 0, calories: fruit.nutritions.calories };
      }
      acc[fruit.name].quantity += fruit.quantity;
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
