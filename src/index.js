import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

const pizzaData = [
  {
    name: "Focaccia",
    ingredients: "Bread with italian olive oil and rosemary",
    price: 6,
    photoName: "pizzas/focaccia.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Margherita",
    ingredients: "Tomato and mozarella",
    price: 10,
    photoName: "pizzas/margherita.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Spinaci",
    ingredients: "Tomato, mozarella, spinach, and ricotta cheese",
    price: 12,
    photoName: "pizzas/spinaci.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Funghi",
    ingredients: "Tomato, mozarella, mushrooms, and onion",
    price: 12,
    photoName: "pizzas/funghi.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Salamino",
    ingredients: "Tomato, mozarella, and pepperoni",
    price: 15,
    photoName: "pizzas/salamino.jpg",
    soldOut: true,
  },
  {
    name: "Pizza Prosciutto",
    ingredients: "Tomato, mozarella, ham, aragula, and burrata cheese",
    price: 18,
    photoName: "pizzas/prosciutto.jpg",
    soldOut: false,
  },
];

function App() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredPizzas = pizzaData.filter(
    (pizza) =>
      pizza.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pizza.ingredients.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="gourmet-container">
      <Header />
      
      <div className="search-filter-wrapper">
        <input
          type="text"
          placeholder="Filter pizzas by name or ingredients..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
      </div>

      <Menu pizzas={filteredPizzas} />
      <Footer />
    </div>
  );
}

function Header() {
  const hour = new Date().getHours();
  const openHour = 10;
  const closeHour = 22;
  const isOpen = hour >= openHour && hour < closeHour;

  return (
    <header className="site-header">
      <div className="header-badge">Artisanal Pizzeria</div>
      <h1>LOEWE'S PIZZA CO.</h1>
      {isOpen && <p className="tagline">Authentic Italian cuisine, all from our stone oven</p>}
    </header>
  );
}

function Menu({ pizzas }) {
  const numPizzas = pizzas.length;

  return (
    <main className="menu-section">
      <div className="menu-title-wrapper">
        <h2>OUR MENU</h2>
        <span className="menu-subtitle">Handcrafted daily with premium ingredients</span>
      </div>

      {numPizzas > 0 ? (
        <div className="pizza-grid">
          {pizzas.map((pizza) => (
            <Pizza pizzaObj={pizza} key={pizza.name} />
          ))}
        </div>
      ) : (
        <p className="empty-notice">No pizzas found matching your search filter.</p>
      )}
    </main>
  );
}

function Pizza({ pizzaObj }) {
  return (
    <article className={`pizza-card ${pizzaObj.soldOut ? "sold-out" : ""}`}>
      <div className="pizza-image-wrapper">
        <img src={pizzaObj.photoName} alt={pizzaObj.name} />
        {pizzaObj.soldOut && <span className="sold-out-badge">SOLD OUT</span>}
      </div>
      <div className="pizza-content">
        <h3>{pizzaObj.name}</h3>
        <p className="pizza-ingredients">{pizzaObj.ingredients}</p>
        <div className="pizza-footer-info">
          <span className="pizza-price">
            {pizzaObj.soldOut ? "—" : `$${pizzaObj.price}`}
          </span>
        </div>
      </div>
    </article>
  );
}

function Footer() {
  const hour = new Date().getHours();
  const openHour = 10;
  const closeHour = 22;
  const isOpen = hour >= openHour && hour < closeHour;

  return (
    <footer className="site-footer">
      {isOpen ? (
        <Order />
      ) : (
        <div className="closed-banner">
          <p>Sorry, we're closed</p>
          <span>Operating hours: 10:00 AM – 10:00 PM</span>
        </div>
      )}
    </footer>
  );
}

function Order() {
  return (
    <div className="order-container">
      <div className="order-text-group">
        <span className="status-dot"></span>
        <p>We're currently open</p>
      </div>
      <button className="order-action-btn" onClick={() => alert("Redirecting to checkout...")}>
        Order
      </button>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);