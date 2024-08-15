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

  // Fetch fruits data on component mount/ page loaded
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

  // Group fruits based on the selected key
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
  }, [fruits, groupBy]);

  // Update the grouping key
  const handleGroupByChange = useCallback((value: GroupingKey | "") => {
    setGroupBy(value);
  }, []);

  return { fruits, groupedFruits, groupBy, handleGroupByChange, loading };
};
