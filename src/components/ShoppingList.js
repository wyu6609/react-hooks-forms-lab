import React, { useState } from "react";
import ItemForm from "./ItemForm";
import Filter from "./Filter";
import Item from "./Item";

import { v4 as uuid } from "uuid";

function ShoppingList({ items }) {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [nameTerm, setNameTerm] = useState("");
  const [nameCategoryTerm, setNameCategoryTerm] = useState("Produce");
  const [shoppingList, setShoppingList] = useState(items);
  function handleCategoryChange(event) {
    setSelectedCategory(event.target.value);
  }
  function handleCategoryNameChange(event) {
    setNameCategoryTerm(event.target.value);
    console.log(event.target.value);
  }

  function handleSearch(event) {
    setSearchTerm(event.target.value);
    console.log(event.target.value);
  }
  function handleNameChange(event) {
    console.log(event.target.value);
    setNameTerm(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    console.log("clicked");
    // submittedData =
    setShoppingList([
      ...shoppingList,
      {
        id: uuid(), // the `uuid` library can be used to generate a unique id
        name: nameTerm,
        category: nameCategoryTerm,
      },
    ]);

    //reset UI state
    setNameTerm("");
    setNameCategoryTerm("Produce");
  }

  let itemsToDisplay = shoppingList
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
    })
    .map((item) => (
      <Item key={item.id} name={item.name} category={item.category} />
    ));

  return (
    <div className="ShoppingList">
      <ItemForm
        onNameChange={handleNameChange}
        onItemFormSubmit={handleSubmit}
        onNameCategoryChange={handleCategoryNameChange}
        newName={nameTerm}
        newCategory={nameCategoryTerm}
      />
      <Filter
        onCategoryChange={handleCategoryChange}
        onSearchChange={handleSearch}
        search={searchTerm}
      />
      <ul className="Items">{itemsToDisplay}</ul>
    </div>
  );
}

export default ShoppingList;
