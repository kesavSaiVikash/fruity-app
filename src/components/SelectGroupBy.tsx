import React from "react";
import { GroupingKey, SelectGroupByProps } from "../types";

const SelectGroupBy: React.FC<SelectGroupByProps> = ({ groupBy, onChange }) => {
  return (
    <select
      value={groupBy}
      onChange={(e) => onChange(e.target.value as GroupingKey | "")}
      className="select-group"
    >
      <option value="">None</option>
      <option value="family">Family</option>
      <option value="order">Order</option>
      <option value="genus">Genus</option>
    </select>
  );
};

export default SelectGroupBy;
