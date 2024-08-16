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
        setFruits(fruitsData.sort((a, b) => a.name.localeCompare(b.name)));
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
      if (!acc[key]) acc[key] = [];
      acc[key].push(fruit);
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

  // General pagination function
  const paginate = (items: any[]) => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return items.slice(startIndex, endIndex);
  };

  // Paginate fruits when no grouping is applied
  const paginatedFruits = groupBy ? [] : paginate(fruits);

  // Paginate grouped fruits
  const groupedKeys = Object.keys(groupedFruits).sort();
  const paginatedGroupedKeys = paginate(groupedKeys);

  const groupedPaginatedFruits = paginatedGroupedKeys.reduce<
    Record<string, Fruit[]>
  >((acc, key) => {
    acc[key] = groupedFruits[key];
    return acc;
  }, {});

  const totalItems = groupBy ? groupedKeys.length : fruits.length;

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
