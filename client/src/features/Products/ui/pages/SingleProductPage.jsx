import React, { useState } from 'react';
import { useEffect } from 'react';
import {useParams} from 'react-router'
import {useApi} from '../../../../config/api'

// Example product data matching your structure

 function SingleProductPage() {
  const {id} = useParams()
  const [product,setProduct] = useState({})

  const [loading,setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);
  

  let maxStock;
  let currentSizeObj 
  const api = useApi()
  const fetchApi = async ()=>{
    try {
      const res = await api.get(`/products/${id}`)
      setProduct(res.data.data.getProduct)
      currentSizeObj = product.sizes.find((s) => s.size === selectedSize);
      maxStock = currentSizeObj ? currentSizeObj.stock : 0;
    } catch (error) {
      console.log("error",error);
    }
    finally{
      setLoading(false)
    }
    
  }
  useEffect(()=>{
    fetchApi()
  },[])

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert("Please select a size");
      return;
    }
    alert('Successfully added to cart')
    console.log("Added to cart:", {
      productId: product._id,
      title: product.title,
      size: selectedSize,
      quantity,
      price: product.price
    });
  };

  if(loading){
    return <p className='text-gray-500 h-screen'>Data is Loading</p>
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-6 md:p-12 flex items-center justify-center">
      <div className="max-w-5xl w-full bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden grid grid-cols-1 md:grid-cols-2 gap-8 p-6 md:p-10">
        
        {/* Left Column: Image Gallery */}
        <div className="flex flex-col gap-4">
          {/* Main Display Image */}
          <div className="w-full h-80 md:h-96 bg-slate-950 border border-slate-800 rounded-2xl overflow-hidden shadow-inner flex items-center justify-center">
            <img 
              src={selectedImage} 
              alt={product.title} 
              className="w-full h-full object-contain p-4"
            />
          </div>

          {/* Thumbnail Selector (if multiple images exist) */}
          {product.images.length > 1 && (
            <div className="flex gap-3 overflow-x-auto pb-2">
              {product.images.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(img)}
                  className={`w-16 h-16 rounded-xl border overflow-hidden bg-slate-950 transition-all ${
                    selectedImage === img ? 'border-indigo-600 ring-2 ring-indigo-600/30' : 'border-slate-800 opacity-60 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="thumbnail" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right Column: Product Details & Actions */}
        <div className="flex flex-col justify-between">
          <div>
            {/* Title & Price */}
            <div className="border-b border-slate-800 pb-5 mb-5">
              <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight mb-2">
                {product.title}
              </h1>
              <div className="text-2xl font-bold text-emerald-400">
                {product.price.currency} {product.price.amount.toLocaleString()}
              </div>
            </div>

            {/* Description */}
            <div className="mb-6">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">Description</h3>
              <p className="text-sm text-slate-300 leading-relaxed break-words bg-slate-950 p-4 rounded-xl border border-slate-800/60">
                {product.description}
              </p>
            </div>

            {/* Size Selector */}
            <div className="mb-6">
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
                Select Size
              </label>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((s) => (
                  <button
                    key={s._id || s.size}
                    onClick={() => setSelectedSize(s.size)}
                    disabled={s.stock === 0}
                    className={`px-4 py-2.5 rounded-xl text-xs font-semibold border transition-all ${
                      selectedSize === s.size
                        ? 'bg-indigo-600 border-indigo-600 text-white shadow-lg shadow-indigo-600/30'
                        : s.stock > 0
                        ? 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700'
                        : 'bg-slate-950/40 border-slate-900 text-slate-600 line-through cursor-not-allowed'
                    }`}
                  >
                    {s.size} ({s.stock})
                  </button>
                ))}
              </div>
            </div>

            {/* Stock Availability status indicator */}
            <div className="text-xs font-medium mb-6">
              {maxStock > 0 ? (
                <span className="text-emerald-400">In Stock ({maxStock} available)</span>
              ) : (
                <span className="text-red-400">Out of Stock for selected size</span>
              )}
            </div>
          </div>

          {/* Action Button */}
          <div className="pt-4 border-t border-slate-800">
            <button
              onClick={handleAddToCart}
              disabled={maxStock === 0}
              className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-medium py-3.5 rounded-xl shadow-lg shadow-indigo-600/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Add to Cart
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}

export default SingleProductPage