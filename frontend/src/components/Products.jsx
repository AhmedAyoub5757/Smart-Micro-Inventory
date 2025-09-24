import { useEffect, useState } from "react";
import { getProducts, deleteProduct, updateProduct } from "../api";
import { Pencil, Trash2 } from "lucide-react";
import { toast } from "react-hot-toast";
import { AnimatePresence } from "framer-motion";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  // Delete modal state
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Edit modal state
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editData, setEditData] = useState({
    name: "",
    price: "",
    stock: "",
  });
  const [errors, setErrors] = useState({});

  // Fetch products
  const fetchProducts = () => {
    setLoading(true);
    getProducts()
      .then((res) => setProducts(res.data))
      .catch((err) => {
        console.error("Error fetching products:", err);
        toast.error("Failed to load products.");
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Handle delete
  const handleDelete = async (id) => {
    try {
      await deleteProduct(id);
      setProducts((prev) => prev.filter((p) => p._id !== id));
      toast.success("Product deleted successfully!");
    } catch (err) {
      console.error("Error deleting product:", err);
      toast.error("Failed to delete product. Please try again.");
    }
  };

  // Validate edit form
  const validate = () => {
    const newErrors = {};
    if (!editData.name.trim()) newErrors.name = "Product name is required.";
    if (!editData.price || editData.price <= 0)
      newErrors.price = "Price must be greater than 0.";
    if (editData.stock < 0 || editData.stock === "")
      newErrors.stock = "Stock cannot be empty or negative.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle edit save
  const handleEditSave = async () => {
    if (!validate()) return;

    try {
      const res = await updateProduct(selectedProduct._id, editData);
      setProducts((prev) =>
        prev.map((p) =>
          p._id === selectedProduct._id ? res.data : p
        )
      );
      toast.success("Product updated successfully!");
      setIsEditOpen(false);
    } catch (err) {
      console.error("Error updating product:", err);
      toast.error("Failed to update product. Please try again.");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Products</h1>

      {loading ? (
        <p className="text-gray-500">Loading...</p>
      ) : products.length === 0 ? (
        <p className="text-gray-500">No products found</p>
      ) : (
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {products.map((product) => (
            <div
              key={product._id}
              className="bg-white shadow-lg rounded-2xl overflow-hidden flex flex-col hover:shadow-xl transition"
            >
              {/* Image Placeholder */}
              <div className="h-36 bg-gray-100 flex items-center justify-center">
                <span className="text-gray-400 text-sm">No Image</span>
              </div>

              {/* Content */}
              <div className="p-4 flex-1 flex flex-col">
                <h2 className="text-lg font-semibold text-gray-800 truncate">
                  {product.name}
                </h2>

                <div className="flex justify-between items-center mt-3">
                  <span className="text-lg font-bold text-blue-600">
                    ${product.price}
                  </span>
                  <span
                    className={`text-sm font-medium ${
                      product.stock > 0 ? "text-green-600" : "text-red-500"
                    }`}
                  >
                    {product.stock > 0
                      ? `${product.stock} in stock`
                      : "Out of stock"}
                  </span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex justify-end gap-3 p-3 border-t bg-gray-50">
                <button
                  onClick={() => {
                    setSelectedProduct(product);
                    setEditData({
                      name: product.name,
                      price: product.price,
                      stock: product.stock,
                    });
                    setErrors({});
                    setIsEditOpen(true);
                  }}
                  className="p-2 rounded-full hover:bg-blue-100 transition"
                >
                  <Pencil className="w-5 h-5 text-blue-600" />
                </button>
                <button
                  onClick={() => {
                    setSelectedProduct(product);
                    setIsDeleteOpen(true);
                  }}
                  className="p-2 rounded-full hover:bg-red-100 transition"
                >
                  <Trash2 className="w-5 h-5 text-red-600" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Confirm Delete Dialog */}
      <AnimatePresence>
        {isDeleteOpen && selectedProduct && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white rounded-2xl shadow-lg p-6 max-w-sm w-full"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
            >
              <h2 className="text-lg font-semibold text-gray-800 mb-4">
                Confirm Delete
              </h2>
              <p className="text-gray-600 mb-6">
                Are you sure you want to delete{" "}
                <span className="font-medium">{selectedProduct.name}</span>?
              </p>
              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setIsDeleteOpen(false)}
                  className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    handleDelete(selectedProduct._id);
                    setIsDeleteOpen(false);
                  }}
                  className="px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Edit Product Dialog */}
      <AnimatePresence>
        {isEditOpen && selectedProduct && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white rounded-2xl shadow-lg p-6 max-w-md w-full"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
            >
              <h2 className="text-xl font-semibold text-gray-800 mb-6">
                Edit Product
              </h2>

              <div className="space-y-5">
                {/* Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Product Name
                  </label>
                  <input
                    type="text"
                    placeholder="Enter product name"
                    value={editData.name}
                    onChange={(e) =>
                      setEditData({ ...editData, name: e.target.value })
                    }
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 ${
                      errors.name ? "border-red-500" : ""
                    }`}
                  />
                  {errors.name && (
                    <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                  )}
                </div>

                {/* Price */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Price
                  </label>
                  <input
                    type="number"
                    placeholder="Enter price"
                    value={editData.price}
                    onChange={(e) =>
                      setEditData({ ...editData, price: e.target.value })
                    }
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 ${
                      errors.price ? "border-red-500" : ""
                    }`}
                  />
                  {errors.price && (
                    <p className="text-red-500 text-sm mt-1">{errors.price}</p>
                  )}
                </div>

                {/* Stock */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Stock
                  </label>
                  <input
                    type="number"
                    placeholder="Enter stock quantity"
                    value={editData.stock}
                    onChange={(e) =>
                      setEditData({ ...editData, stock: e.target.value })
                    }
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 ${
                      errors.stock ? "border-red-500" : ""
                    }`}
                  />
                  {errors.stock && (
                    <p className="text-red-500 text-sm mt-1">{errors.stock}</p>
                  )}
                </div>
              </div>

              <div className="flex justify-end gap-3 mt-8">
                <button
                  onClick={() => setIsEditOpen(false)}
                  className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  onClick={handleEditSave}
                  className="px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600"
                >
                  Save
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Products;
