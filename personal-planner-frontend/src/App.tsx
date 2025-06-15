import React from "react";
import "./App.css";
import { Category } from "./types"; // Importer kontrakten
import CategoryList from "./components/CategoryList"; // Importer komponenten

// La oss lage litt hardkodet data som følger Category-kontrakten
const mockCategories: Category[] = [
  { id: 1, name: "Matvarer" },
  { id: 2, name: "Transport" },
  { id: 3, name: "Bolig" },
  { id: 4, name: "Underholdning" },
];

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Finance Planner</h1>
      </header>
      <main className="main-content">
        {/* Bruk komponenten vår og send inn de hardkodede dataene som "props" */}
        <CategoryList categories={mockCategories} />
      </main>

      <footer className="App-footer">
        <h1>Jeg liker ikke CSS</h1>
      </footer>
    </div>
  );
}

export default App;
