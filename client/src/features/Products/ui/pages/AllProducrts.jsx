import React, { useEffect, useState } from 'react';
import UsreProducts from '../components/UsreProducts';
import { useApi } from '../../../../config/api';

// Example dummy products matching your schema
const INITIAL_PRODUCTS = [
  {
    _id: "p1",
    title: "Classic Cotton Hoodie",
    description: "A warm and comfortable hoodie made from 100% organic cotton, perfect for chilly weather.",
    price: { amount: 3500, currency: "RS" },
    images: ["https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&q=80&w=400"],
    sizes: [
      { size: "M", stock: 12 },
      { size: "L", stock: 5 },
      { size: "XL", stock: 0 }
    ]
  },
  {
    _id: "p2",
    title: "Minimalist Denim Jacket",
    description: "Vintage-washed denim jacket featuring a classic collar and durable button closures.",
    price: { amount: 5500, currency: "RS" },
    images: ["https://images.unsplash.com/photo-1543076447-215ad9ba6923?auto=format&fit=crop&q=80&w=400"],
    sizes: [
      { size: "S", stock: 8 },
      { size: "M", stock: 15 },
      { size: "L", stock: 2 }
    ]
  },
  {
    _id: "p3",
    title: "Essential Oversized Tee",
    description: "Breathable heavy-weight cotton t-shirt designed for an effortless streetwear look.",
    price: { amount: 1800, currency: "RS" },
    images: ["https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&q=80&w=400"],
    sizes: [
      { size: "XS", stock: 4 },
      { size: "S", stock: 10 },
      { size: "M", stock: 20 },
      { size: "L", stock: 6 }
    ]
  }
];

function AllProducts() {
  const api = useApi()
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSizeFilter, setSelectedSizeFilter] = useState('ALL');

  // Filter products based on search query and size selection
  const getAllProducts = async ()=>{
    const res = await api.get('/products/')
    console.log(res.data.data.product);
    setProducts(res.data.data.product)
  }

  useEffect(()=>{
    getAllProducts()
  },[])
  
  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          product.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesSize = selectedSizeFilter === 'ALL' || 
                        product.sizes.some((s) => s.size === selectedSizeFilter && s.stock > 0);

    return matchesSearch && matchesSize;
  });

  const handleAddToCart = (product) => {
    // Add your cart logic here (e.g., Redux state, Context, or API call)
    console.log("Added to cart:", product.title);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-6 md:p-10">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-extrabold text-white tracking-tight">Explore Collection</h1>
            <p className="text-slate-400 mt-1">Discover our latest arrivals and premium apparel.</p>
          </div>

          {/* Search Bar */}
          <div className="w-full md:w-72">
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-indigo-600 transition-colors"
            />
          </div>
        </div>

        {/* Size Filters Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-6">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider mr-2">Filter Size:</span>
          {['ALL', 'XS', 'S', 'M', 'L', 'XL', 'XXL'].map((size) => (
            <button
              key={size}
              onClick={() => setSelectedSizeFilter(size)}
              className={`px-4 py-2 rounded-xl text-xs font-medium transition-all ${
                selectedSizeFilter === size
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
                  : 'bg-slate-900 border border-slate-800 text-slate-300 hover:bg-slate-800'
              }`}
            >
              {size}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-20 bg-slate-900/40 border border-slate-800 rounded-2xl">
            <p className="text-slate-400 font-medium">No products match your criteria.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => {
              const hasStock = product.sizes.some((s) => s.stock > 0);

              return <UsreProducts key={product._id} product={product} hasStock={hasStock}/>
            })}
          </div>
        )}

      </div>
    </div>
  );
}

export default AllProducts