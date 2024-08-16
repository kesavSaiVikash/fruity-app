import { useState, useEffect, useCallback } from "react";
import { fetchFruits } from "../api/fruityvice";
import { Fruit, GroupingKey } from "../types";

export const useFruits = () => {
  const [fruits, setFruits] = useState<Fruit[]>([]);
  const [loading, setLoading] = useState(true);
  const [groupBy, setGroupBy] = useState<GroupingKey | "">("");
  const [groupedFruits, setGroupedFruits] = useState<Record<string, Fruit[]>>(
    {}
  );
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    const fetchAndSetFruits = async () => {
      setLoading(true);
      try {
        const fruitsData = await fetchFruits();
        setFruits(fruitsData);
      } catch (error) {
        console.error("Failed to fetch fruits:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAndSetFruits();
  }, []);

  useEffect(() => {
    if (!groupBy) {
      setGroupedFruits({});
      return;
    }

    const grouped = fruits.reduce<Record<string, Fruit[]>>((acc, fruit) => {
      const key = fruit[groupBy];
      acc[key] = acc[key] ? [...acc[key], fruit] : [fruit];
      return acc;
    }, {});

    setGroupedFruits(grouped);
    setCurrentPage(1); // Reset to the first page when grouping changes
  }, [fruits, groupBy]);

  const handleGroupByChange = useCallback((value: GroupingKey | "") => {
    setGroupBy(value);
    setCurrentPage(1); // Reset to the first page when grouping changes
  }, []);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // Paginate fruits when no grouping is applied
  const paginatedFruits = groupBy
    ? [] // No fruits to display when grouped
    : fruits.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
      );

  // Get the list of grouped keys and apply pagination
  const groupedKeys = Object.keys(groupedFruits);
  const totalGroups = groupedKeys.length;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const paginatedGroupedKeys = groupedKeys.slice(startIndex, endIndex);
  const groupedPaginatedFruits = paginatedGroupedKeys.reduce<
    Record<string, Fruit[]>
  >((acc, key) => {
    acc[key] = groupedFruits[key];
    return acc;
  }, {});

  const totalItems = groupBy ? totalGroups : fruits.length;

  return {
    fruits: groupBy ? [] : paginatedFruits,
    groupedFruits: groupBy ? groupedPaginatedFruits : {},
    groupBy,
    handleGroupByChange,
    loading,
    currentPage,
    itemsPerPage,
    totalItems,
    handlePageChange,
    paginatedGroupedKeys,
  };
};
