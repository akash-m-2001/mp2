import React, { useContext, useState } from "react";
import { ItemsContext } from "../ItemsContext";
import { Item } from "../types";
import { Link } from "react-router-dom";
import styles from "./GalleryView.module.css";

function GalleryView() {
  const context = useContext(ItemsContext);
  if (!context) throw new Error("ItemsContext not found");
  const { items } = context;

  const allTypes = Array.from(new Set(items.flatMap(i => i.types)));
  const [selectedType, setSelectedType] = useState<string>("");

  const filtered = selectedType
    ? items.filter(i => i.types.includes(selectedType))
    : items;

  return (
    <div className={styles.galleryContainer}>
      <h2 className={styles.galleryHeader}>Gallery View</h2>

      <div className={styles.filterControls}>
        <label>
          Filter by Type:{" "}
          <select value={selectedType} onChange={e => setSelectedType(e.target.value)}>
            <option value="">All</option>
            {allTypes.map(type => <option key={type} value={type}>{type}</option>)}
          </select>
        </label>
      </div>

      <div className={styles.galleryGrid}>
        {filtered.map((item: Item) => (
          <Link key={item.id} to={`/item/${item.id}`} className={styles.galleryItem}>
            {item.image && <img src={item.image} alt={item.name} className={styles.galleryImage} />}
            <p className={styles.galleryName}>{item.name}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default GalleryView;
