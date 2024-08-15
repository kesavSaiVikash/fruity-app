import { atom } from "jotai";
import { Fruit } from "../types";

// Atom (global state variable) to store the list of fruits in the jar
export const jarFruitsAtom = atom<Fruit[]>([]);

// Atom (global state variable) to store the total calories
export const totalCaloriesAtom = atom<number>(0);
