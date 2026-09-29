import React from 'react'
import { useNavigate } from 'react-router';

const UsreProducts = ({product,hasStock}) => {
  const navigate = useNavigate()
  return (
                <div  
                  className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl flex flex-col justify-between group transition-all hover:border-slate-700"
                >
                  {/* Image Container */}
                  <div onClick={()=>navigate(`/main/${product._id}`)} className="relative h-64 bg-slate-950 overflow-hidden">
                    <img 
                      src={product.images[0] || "https://via.placeholder.com/400"} 
                      alt={product.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    
                    {/* Price Badge */}
                    <div className="absolute bottom-3 left-3 bg-slate-950/80 backdrop-blur-md border border-slate-800 px-3 py-1.5 rounded-xl text-xs font-bold text-emerald-400 shadow-lg">
                      {product.price.currency} {product.price.amount.toLocaleString()}
                    </div>

                    {/* Stock Status Badge */}
                    {!hasStock && (
                      <div className="absolute top-3 right-3 bg-red-500/90 text-white px-3 py-1 rounded-xl text-xs font-semibold shadow-lg">
                        Sold Out
                      </div>
                    )}
                  </div>

                  {/* Card Content */}
                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="font-bold text-lg text-white mb-1 group-hover:text-indigo-400 transition-colors truncate">
                        {product.title}
                      </h3>
                      <p className="text-sm text-slate-400 line-clamp-2 mb-4">
                        {product.description}
                      </p>
                    </div>

                    <div>
                      {/* Available Sizes Tags */}
                      <div className="flex flex-wrap gap-1.5 mb-5">
                        {product.sizes.map((s) => (
                          <span 
                            key={s.size} 
                            className={`text-xs px-2.5 py-1 rounded-lg border ${
                              s.stock > 0 
                                ? 'bg-slate-950 border-slate-800 text-slate-300' 
                                : 'bg-slate-950/40 border-slate-900 text-slate-600 line-through'
                            }`}
                          >
                            {s.size}
                          </span>
                        ))}
                      </div>

                      {/* Add to Cart Button */}
                      <button
                        onClick={() => handleAddToCart(product)}
                        disabled={!hasStock}
                        className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-medium py-3 rounded-xl shadow-lg shadow-indigo-600/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-indigo-600"
                      >
                        {hasStock ? 'Add to Cart' : 'Out of Stock'}
                      </button>
                    </div>
                  </div>

                </div>
              );
}

export default UsreProducts