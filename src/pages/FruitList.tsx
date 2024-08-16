import React, { useState, useEffect } from "react";
import { useFruits } from "../hooks/useFruits";
import { useJar } from "../hooks/useJar";
import {
  Loader,
  SelectGroupBy,
  Group,
  Pagination,
  FruitItem,
} from "../components";

const FruitList: React.FC = () => {
  const {
    fruits,
    groupedFruits,
    groupBy,
    handleGroupByChange,
    loading,
    currentPage,
    itemsPerPage,
    totalItems,
    handlePageChange,
    paginatedGroupedKeys,
  } = useFruits();
  const { addFruitToJar, addGroupOfFruitsToJar } = useJar();

  const [collapsedGroups, setCollapsedGroups] = useState<
    Record<string, boolean>
  >({});

  useEffect(() => {
    // Initialize collapsed state for new groups
    setCollapsedGroups((prev) => {
      const newState = { ...prev };
      paginatedGroupedKeys.forEach((key) => {
        if (!(key in newState)) {
          newState[key] = true; // Collapse all groups by default
        }
      });
      return newState;
    });
  }, [paginatedGroupedKeys]);

  useEffect(() => {
    // Reset collapsed state when grouping changes
    setCollapsedGroups({});
  }, [groupBy]);

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
        <div className="fruit-group-container">
          {groupBy ? (
            paginatedGroupedKeys.map((key) => (
              <Group
                key={key}
                name={key}
                fruits={groupedFruits[key]}
                isCollapsed={collapsedGroups[key] ?? true}
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
        <Pagination
          currentPage={currentPage}
          totalItems={totalItems}
          itemsPerPage={itemsPerPage}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default FruitList;
