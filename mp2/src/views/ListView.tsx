import React, { useContext, useEffect, useState } from "react";
import { ItemsContext } from "../ItemsContext";
import { fetchItems } from "../api";
import { Link } from "react-router-dom";
import { Item } from "../types";
import styles from "./ListView.module.css";

function ListView() {
  const context = useContext(ItemsContext);
  if (!context) throw new Error("ItemsContext not found");
  const { items, setItems } = context;

  const [search, setSearch] = useState("");
  const [sortKey, setSortKey] = useState<"id" | "name">("id");
  const [sortAsc, setSortAsc] = useState(true);

  useEffect(() => {
    fetchItems().then(setItems);
  }, [setItems]);

  const filtered = search
    ? items
        .filter(item => item.name.toLowerCase().includes(search.toLowerCase()))
        .sort((a, b) => {
          if (sortKey === "name") {
            return sortAsc
              ? a.name.localeCompare(b.name)
              : b.name.localeCompare(a.name);
          } else {
            return sortAsc ? a.id - b.id : b.id - a.id;
          }
        })
    : [];

  return (
    <div className={styles.listContainer}>
      <h2 className={styles.header}>List View</h2>

      <input
        className={styles.searchInput}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search Pokémon..."
      />

      <div className={styles.sortControls}>
        <label>
          Sort by:{" "}
          <select
            value={sortKey}
            onChange={(e) => setSortKey(e.target.value as "id" | "name")}
          >
            <option value="id">ID</option>
            <option value="name">Name</option>
          </select>
        </label>
        <button
          className={styles.sortButton}
          onClick={() => setSortAsc(!sortAsc)}
        >
          {sortAsc ? "Asc" : "Desc"}
        </button>
      </div>

      <ul className={styles.itemList}>
        {search === "" ? (
          <li>Type in the search bar to start filtering...</li>
        ) : filtered.length === 0 ? (
          <li>No results found</li>
        ) : (
          filtered.map((item: Item) => (
            <li key={item.id} className={styles.itemRow}>
              <Link to={`/item/${item.id}`} className={styles.itemLink}>
                {item.image && <img src={item.image} alt={item.name} className={styles.itemImage} />}
                <div className={styles.itemText}>
                  <strong>{item.name}</strong> (ID: {item.id})
                  <div className={styles.itemInfo}>
                    {item.types && <span>Type: {item.types.join(", ")}</span>}
                    {item.height !== undefined && <span> | Height: {item.height}</span>}
                    {item.weight !== undefined && <span> | Weight: {item.weight}</span>}
                    {item.base_experience !== undefined && <span> | XP: {item.base_experience}</span>}
                  </div>
                </div>
              </Link>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}

export default ListView;
