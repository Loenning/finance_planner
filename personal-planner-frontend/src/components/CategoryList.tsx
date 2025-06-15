import React from "react";
import { Category } from "../types"; // Importer kontrakten vår
import styles from "./CategoryList.module.css";

// Definer en kontrakt for "props" (data) som denne komponenten forventer å motta
interface CategoryListProps {
  categories: Category[]; // Den forventer en liste med objekter som følger Category-kontrakten
}

// Definer komponenten. React.FC betyr "Functional Component"
const CategoryList: React.FC<CategoryListProps> = ({ categories }) => {
  return (
    <div>
      <h2>Kategorier</h2>
      <ul>
        {/* Bruk .map() til å gå gjennom listen og lage et <li>-element for hver kategori */}
        {categories.map((category) => (
          <li key={category.id} className={styles.listItem}>
            {category.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

interface CategoryListProps {
  categories: Category[];
}

export default CategoryList;
