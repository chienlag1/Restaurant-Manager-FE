import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import ProductCard from "../../component/productCard";

const CartScreen = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedItems, setSelectedItems] = useState(new Set());
  const { user } = useAuth();
  const navigate = useNavigate();

  const fetchCartItems = useCallback(async () => {
    if (!user) {
      setLoading(false);
      return;
    }
    try {
      const response = await axios.get(`http://localhost:5000/cart/${user.id}`);
      setCartItems(response.data.products || []);
    } catch (error) {
      console.error("Error fetching cart items:", error);
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    fetchCartItems();
  }, [fetchCartItems]);

  const toggleSelectItem = (itemId) => {
    setSelectedItems((prev) => {
      const newSelectedItems = new Set(prev);
      newSelectedItems.has(itemId)
        ? newSelectedItems.delete(itemId)
        : newSelectedItems.add(itemId);
      return newSelectedItems;
    });
  };

  const incrementQuantity = async (itemId) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.productId._id === itemId
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
    await axios.put(`http://localhost:5000/cart/${user.id}/${itemId}/update`, {
      quantity:
        cartItems.find((item) => item.productId._id === itemId).quantity + 1,
    });
  };

  const decrementQuantity = async (itemId) => {
    const item = cartItems.find((item) => item.productId._id === itemId);
    if (item.quantity > 1) {
      setCartItems((prevItems) =>
        prevItems.map((item) =>
          item.productId._id === itemId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
      );
      await axios.put(
        `http://localhost:5000/cart/${user.id}/${itemId}/update`,
        { quantity: item.quantity - 1 }
      );
    }
  };

  const removeSelectedItems = async () => {
    if (selectedItems.size === 0) return;
    await Promise.all(
      [...selectedItems].map((itemId) =>
        axios.delete(`https://mma301.onrender.com/cart/${user.id}/${itemId}`)
      )
    );
    setCartItems(
      cartItems.filter((item) => !selectedItems.has(item.productId._id))
    );
    setSelectedItems(new Set());
  };

  const handleCheckout = async () => {
    if (selectedItems.size === 0) return;
    navigate("/checkout", { state: { selectedItems: [...selectedItems] } });
  };

  return (
    <div className="cart-container">
      <h2>Giỏ hàng</h2>
      {loading ? (
        <p>Đang tải...</p>
      ) : cartItems.length === 0 ? (
        <p>Giỏ hàng trống</p>
      ) : (
        <>
          <button onClick={removeSelectedItems}>Xóa sản phẩm</button>
          <div className="cart-list">
            {cartItems.map((item) => (
              <div key={item.productId._id} className="cart-item">
                <input
                  type="checkbox"
                  checked={selectedItems.has(item.productId._id)}
                  onChange={() => toggleSelectItem(item.productId._id)}
                />
                <ProductCard product={item.productId} />
                <div className="quantity-controls">
                  <button onClick={() => decrementQuantity(item.productId._id)}>
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button onClick={() => incrementQuantity(item.productId._id)}>
                    +
                  </button>
                </div>
              </div>
            ))}
          </div>
          <button onClick={handleCheckout}>Mua hàng</button>
        </>
      )}
    </div>
  );
};

export default CartScreen;
