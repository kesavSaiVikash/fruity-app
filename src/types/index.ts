export interface Fruit {
  quantity: number;
  name: string;
  id: string;
  family: string;
  order: string;
  genus: string;
  nutritions: {
    calories: number;
    [key: string]: number;
  };
}

export interface FruitItemProps {
  fruit: Fruit;
  onAddFruit: (fruit: Fruit) => void;
}

export type GroupingKey = "family" | "order" | "genus";

export interface GroupProps {
  name: string;
  fruits: Fruit[];
  isCollapsed: boolean;
  onToggle: () => void;
  onAddAll: () => void;
  onAddFruit: (fruit: Fruit) => void;
}

export interface PopupProps {
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export interface SelectGroupByProps {
  groupBy: GroupingKey | "";
  onChange: (value: GroupingKey | "") => void;
}

export interface LayoutProps {
  children: React.ReactNode;
}
