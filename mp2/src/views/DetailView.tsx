import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ItemsContext, ItemsContextType } from "../ItemsContext";
import { fetchItemDetail, fetchItems } from "../api";
import { Item } from "../types";
import styles from "./DetailView.module.css";

function DetailView() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { items, setItems } = useContext(ItemsContext) as ItemsContextType;
  const [item, setItem] = useState<Item | null>(null);
  const [prevItem, setPrevItem] = useState<Item | null>(null);
  const [nextItem, setNextItem] = useState<Item | null>(null);

  // Fetch the current item
  useEffect(() => {
  if (id) {
    // Fetch current item
    fetchItemDetail(Number(id))
      .then(setItem)
      .catch(() => setItem(null));

    // If items list is empty, fetch it
    if (items.length === 0) {
      fetchItems().then(setItems);
    }
  }
}, [id, items.length, setItems]);


  // Update prev/next whenever item or items change
  useEffect(() => {
  if (!item || items.length === 0) {
    setPrevItem(null);
    setNextItem(null);
    return;
  }
  const currentIndex = items.findIndex(i => i.id === item.id);
  setPrevItem(currentIndex > 0 ? items[currentIndex - 1] : null);
  setNextItem(currentIndex >= 0 && currentIndex < items.length - 1 ? items[currentIndex + 1] : null);
}, [item, items]);


  if (!item) return <h2 className={styles.loadingText}>Loading...</h2>;

  return (
    <div className={styles.cardContainer}>
      <div className={styles.card}>
        <h2 className={styles.name}>{item.name}</h2>

        <div className={styles.topSection}>
          {item.image && <img src={item.image} alt={item.name} className={styles.image} />}
          <div className={styles.basicInfo}>
            <p><strong>ID:</strong> {item.id}</p>
            <p><strong>Types:</strong> {item.types.join(", ")}</p>
            {item.height !== undefined && <p><strong>Height:</strong> {item.height}</p>}
            {item.weight !== undefined && <p><strong>Weight:</strong> {item.weight}</p>}
            {item.base_experience !== undefined && <p><strong>XP:</strong> {item.base_experience}</p>}
            {item.abilities && <p><strong>Abilities:</strong> {item.abilities.join(", ")}</p>}
          </div>
        </div>

        {item.stats && (
          <div className={styles.statsSection}>
            <strong>Stats:</strong>
            <div className={styles.statsGrid}>
              {item.stats.map(s => (
                <span key={s.name}>{s.name}: {s.value}</span>
              ))}
            </div>
          </div>
        )}

        <div className={styles.navButtons}>
          <button disabled={!prevItem} onClick={() => prevItem && navigate(`/item/${prevItem.id}`)}>← Previous</button>
          <button disabled={!nextItem} onClick={() => nextItem && navigate(`/item/${nextItem.id}`)}>Next →</button>
        </div>
      </div>
    </div>
  );
}

export default DetailView;
