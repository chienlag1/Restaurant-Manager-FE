// ProductCard.js
import React from "react";
import "./productCardCss.css";
const ProductCard = ({ product, isSelected, onClick, onAddToCart }) => {
  return (
    <div
      onClick={onClick}
      className={`product-card ${isSelected ? "selected" : ""}`}
      style={{ width: "18rem" }}
    >
      <img
        style={{ border: "20px" }}
        src={product.imageUrl}
        class="card-img-top"
        alt={product.name}
      />
      <div class="card-body">
        <h5 class="card-title">{product.name}</h5>
        <p class="card-text">{product.price.toLocaleString("vi-VN")} VND</p>
        <button className="btn btn-primary" onClick={onAddToCart}>
          Buy
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
