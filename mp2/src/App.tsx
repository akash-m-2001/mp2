import React from "react";
import { BrowserRouter, Routes, Route, Link, useLocation } from "react-router-dom";
import { ItemsProvider } from "./ItemsContext";
import ListView from "./views/ListView";
import GalleryView from "./views/GalleryView";
import DetailView from "./views/DetailView";
import styles from "./App.module.css";

function Navbar() {
  const location = useLocation();
  const tabs = [
    { name: "List", path: "/" },
    { name: "Gallery", path: "/gallery" }
  ];
  const activeIndex = tabs.findIndex(tab => tab.path === location.pathname);

  return (
    <nav className={styles.navbar}>
      {tabs.map((tab) => (
        <Link key={tab.name} to={tab.path} className={styles.navLink}>
          {tab.name}
        </Link>
      ))}
      <div
        className={styles.navMarker}
        style={{ transform: `translateX(${activeIndex * 100}%)` }}
      />
    </nav>
  );
}

function App() {
  return (
    <ItemsProvider>
      <BrowserRouter basename="/mp2">
        <header className={styles.header}>
          <h1>Pokémon Data Book</h1>
        </header>

        <Navbar />

        <Routes>
          <Route path="/" element={<ListView />} />
          <Route path="/gallery" element={<GalleryView />} />
          <Route path="/item/:id" element={<DetailView />} />
        </Routes>
      </BrowserRouter>
    </ItemsProvider>
  );
}

export default App;
