import { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "../component/productCard"; // Import component ProductCard
import { useAuth } from "../context/AuthContext";

function MenuScreen() {
  const { user } = useAuth();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [category, setCategory] = useState("Main Course"); // Mặc định chọn "Món chính"

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:5001/products");
        console.log("API Response:", response.data);
        setProducts(response.data);
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu sản phẩm:", error);
        setError("Lỗi khi lấy dữ liệu sản phẩm");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const addToCart = async (product) => {
    if (!user) {
      alert("You must be logged in to add items to the cart.");
      return;
    }
    try {
      await axios.post(`http://localhost:5001/cart/${user.id}`, {
        productId: product._id,
        quantity: 1,
      });
      alert("Product added to cart!");
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  if (loading) return <p>Đang tải...</p>;
  if (error) return <p>{error}</p>;

  const filteredProducts = products.filter(
    (product) => product.category === category
  );

  // CSS-in-JS styles
  const styles = {
    menuScreen: {
      textAlign: "center",
      padding: "20px",
      fontFamily: "Arial, sans-serif",
    },
    title: {
      marginBottom: "20px",
      fontSize: "24px",
      color: "#333",
    },
    categoryFilter: {
      display: "flex",
      justifyContent: "center",
      gap: "15px",
      marginBottom: "20px",
    },
    filterButton: (isActive) => ({
      padding: "12px 20px",
      fontSize: "16px",
      fontWeight: "bold",
      border: "none",
      cursor: "pointer",
      backgroundColor: isActive ? "#ff9800" : "#ddd",
      color: isActive ? "white" : "black",
      borderRadius: "8px",
      transition: "all 0.3s ease-in-out",
      transform: isActive ? "scale(1.1)" : "scale(1)",
    }),
    productList: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
      gap: "20px",
      padding: "20px",
    },
  };

  return (
    <div style={styles.menuScreen}>
      <h2 style={styles.title}>Hikari Restaurant</h2>

      {/* Bộ lọc danh mục */}
      <div style={styles.categoryFilter}>
        {["Main Course", "Drink", "Dessert"].map((cat) => (
          <button
            key={cat}
            style={styles.filterButton(category === cat)}
            onClick={() => setCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Danh sách sản phẩm */}
      <div style={styles.productList}>
        {filteredProducts.map((product) => (
          <ProductCard
            key={product._id}
            product={product}
            isSelected={selectedProduct?._id === product._id}
            onClick={() => setSelectedProduct(product)}
            onAddToCart={() => addToCart(product)}
          />
        ))}
      </div>
    </div>
  );
}

export default MenuScreen;
