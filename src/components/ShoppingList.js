import React, { useState } from "react";
import ItemForm from "./ItemForm";
import Filter from "./Filter";
import Item from "./Item";

function ShoppingList({ items }) {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [nameTerm, setNameTerm] = useState("");
  function handleCategoryChange(event) {
    setSelectedCategory(event.target.value);
  }

  function handleSearch(event) {
    setSearchTerm(event.target.value);
    console.log(event.target.value);
  }
  function handleNameChange(event) {
    console.log(event.target.value);
  }

  const itemsToDisplay = items
    .filter((item) => {
      if (searchTerm == "") {
        return item;
      } else if (item.name.toLowerCase().includes(searchTerm.toLowerCase())) {
        return item;
      }
    })
    .filter((item) => {
      if (selectedCategory === "All") return true;

      return item.category === selectedCategory;
    });

  return (
    <div className="ShoppingList">
      <ItemForm onNameChange={handleNameChange} />
      <Filter
        onCategoryChange={handleCategoryChange}
        onSearchChange={handleSearch}
        search={searchTerm}
      />
      <ul className="Items">
        {itemsToDisplay.map((item) => (
          <Item key={item.id} name={item.name} category={item.category} />
        ))}
      </ul>
    </div>
  );
}

export default ShoppingList;
