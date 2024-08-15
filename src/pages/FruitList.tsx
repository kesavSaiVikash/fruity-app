import React, { useState, useEffect } from "react";
import { useFruits } from "../hooks/useFruits";
import { useJar } from "../hooks/useJar";
import { Loader, SelectGroupBy, Group, FruitItem } from "../components";

const FruitList: React.FC = () => {
  const { fruits, groupedFruits, groupBy, handleGroupByChange, loading } =
    useFruits();
  const { addFruitToJar, addGroupOfFruitsToJar } = useJar();

  const [collapsedGroups, setCollapsedGroups] = useState<
    Record<string, boolean>
  >({});

  useEffect(() => {
    if (groupBy) {
      const initialCollapsedState: Record<string, boolean> = {};
      Object.keys(groupedFruits).forEach((key) => {
        initialCollapsedState[key] = true;
      });
      setCollapsedGroups(initialCollapsedState);
    }
  }, [groupedFruits, groupBy]);

  const handleToggleGroup = (group: string) => {
    setCollapsedGroups((prev) => ({
      ...prev,
      [group]: !prev[group],
    }));
  };

  return (
    <div className="page-container">
      <div className="fruit-list-card">
        {loading && <Loader />}
        <h1 className="card-header">Fruits List</h1>
        <SelectGroupBy groupBy={groupBy} onChange={handleGroupByChange} />
        <div className="group-container">
          {groupBy ? (
            Object.keys(groupedFruits).map((key) => (
              <Group
                key={key}
                name={key}
                fruits={groupedFruits[key]}
                isCollapsed={collapsedGroups[key]}
                onToggle={() => handleToggleGroup(key)}
                onAddAll={() => addGroupOfFruitsToJar(groupedFruits[key])}
                onAddFruit={addFruitToJar}
              />
            ))
          ) : (
            <ul>
              {fruits.map((fruit) => (
                <FruitItem
                  key={fruit.id}
                  fruit={fruit}
                  onAddFruit={addFruitToJar}
                />
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default FruitList;
