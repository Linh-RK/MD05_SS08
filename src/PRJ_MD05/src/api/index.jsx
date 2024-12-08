const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const mockProducts = [
  {
    id: "1",
    name: "T-Shirt",
    price: 19.99,
    image: "https://example.com/tshirt.jpg",
    description: "Comfortable cotton t-shirt",
    featured: true,
  },
  {
    id: "2",
    name: "Jeans",
    price: 49.99,
    image: "https://example.com/jeans.jpg",
    description: "Classic blue jeans",
  },
  {
    id: "3",
    name: "Sneakers",
    price: 79.99,
    image: "https://example.com/sneakers.jpg",
    description: "Stylish and comfortable sneakers",
    featured: true,
  },
];

const mockUsers = [
  {
    id: "1",
    username: "admin",
    email: "admin@example.com",
    role: "admin",
    fullName: "Admin User",
    phone: "1234567890",
    avatar: "https://example.com/admin-avatar.jpg",
  },
  {
    id: "2",
    username: "user1",
    email: "user1@example.com",
    role: "user",
    fullName: "John Doe",
    phone: "9876543210",
    avatar: "https://example.com/user1-avatar.jpg",
  },
];

const mockWishlist = [
  { id: "1", userId: "2", productId: "1" },
  { id: "2", userId: "2", productId: "3" },
];

const mockOrders = [
  {
    id: "1",
    userId: "2",
    items: [
      { id: "1", name: "T-Shirt", quantity: 2, price: 19.99 },
      { id: "3", name: "Sneakers", quantity: 1, price: 79.99 },
    ],
    total: 119.97,
    status: "Completed",
    createdAt: "2023-06-01T10:00:00Z",
  },
  {
    id: "2",
    userId: "2",
    items: [{ id: "2", name: "Jeans", quantity: 1, price: 49.99 }],
    total: 49.99,
    status: "Processing",
    createdAt: "2023-06-05T14:30:00Z",
  },
];

const mockCategories = [
  { id: "1", name: "Clothing", description: "All types of clothing" },
  { id: "2", name: "Shoes", description: "Footwear for all occasions" },
  { id: "3", name: "Accessories", description: "Belts, hats, and more" },
];

const mockReviews = [
  {
    id: "1",
    productId: "1",
    userId: "2",
    name: "John Doe",
    rating: 4,
    comment: "Great product!",
    avatar: "https://example.com/avatar1.jpg",
  },
  {
    id: "2",
    productId: "1",
    userId: "3",
    name: "Jane Smith",
    rating: 5,
    comment: "Excellent quality!",
    avatar: "https://example.com/avatar2.jpg",
  },
];

// Existing API functions...

export const fetchWishlistAPI = async () => {
  await delay(500);
  const userId = "2"; // Assuming logged-in user has id '2'
  return {
    data: mockProducts.filter((product) =>
      mockWishlist.some(
        (item) => item.userId === userId && item.productId === product.id
      )
    ),
  };
};

export const addToWishlistAPI = async (productId) => {
  await delay(500);
  const userId = "2"; // Assuming logged-in user has id '2'
  const newWishlistItem = {
    id: String(mockWishlist.length + 1),
    userId,
    productId,
  };
  mockWishlist.push(newWishlistItem);
  return { data: mockProducts.find((product) => product.id === productId) };
};

export const removeFromWishlistAPI = async (productId) => {
  await delay(500);
  const userId = "2"; // Assuming logged-in user has id '2'
  const index = mockWishlist.findIndex(
    (item) => item.userId === userId && item.productId === productId
  );
  if (index !== -1) {
    mockWishlist.splice(index, 1);
  }
};

export const fetchProfileAPI = async () => {
  await delay(500);
  const userId = "2"; // Assuming logged-in user has id '2'
  const user = mockUsers.find((u) => u.id === userId);
  if (!user) {
    throw new Error("User not found");
  }
  return { data: user };
};

export const updateProfileAPI = async (userData) => {
  await delay(500);
  const userId = "2"; // Assuming logged-in user has id '2'
  const index = mockUsers.findIndex((u) => u.id === userId);
  if (index !== -1) {
    mockUsers[index] = { ...mockUsers[index], ...userData };
    return { data: mockUsers[index] };
  }
  throw new Error("User not found");
};

export const fetchOrdersAPI = async () => {
  await delay(500);
  const userId = "2"; // Assuming logged-in user has id '2'
  return { data: mockOrders.filter((order) => order.userId === userId) };
};

export const createOrderAPI = async (orderData) => {
  await delay(500);
  const userId = "2"; // Assuming logged-in user has id '2'
  const newOrder = {
    id: String(mockOrders.length + 1),
    userId,
    items: orderData,
    total: orderData.reduce((sum, item) => sum + item.price * item.quantity, 0),
    status: "Processing",
    createdAt: new Date().toISOString(),
  };
  mockOrders.push(newOrder);
  return { data: newOrder };
};

export const fetchFeaturedProductsAPI = async () => {
  await delay(500);
  return { data: mockProducts.filter((product) => product.featured) };
};

export const fetchCategoriesAPI = async () => {
  await delay(500);
  return { data: mockCategories };
};

export const addReviewAPI = async (reviewData) => {
  await delay(500);
  const newReview = {
    id: String(mockReviews.length + 1),
    ...reviewData,
    name: "Current User", // In a real app, this would come from the authenticated user
    avatar: "https://example.com/default-avatar.jpg",
  };
  mockReviews.push(newReview);
  return { data: newReview };
};

// Export all API functions
export {
  fetchProductsAPI,
  fetchProductByIdAPI,
  loginAPI,
  signUpAPI,
  getUsersAPI,
  updateUserAPI,
  deleteUserAPI,
  fetchWishlistAPI,
  addToWishlistAPI,
  removeFromWishlistAPI,
  fetchProfileAPI,
  updateProfileAPI,
  fetchOrdersAPI,
  createOrderAPI,
  fetchFeaturedProductsAPI,
  fetchCategoriesAPI,
  addReviewAPI,
};
