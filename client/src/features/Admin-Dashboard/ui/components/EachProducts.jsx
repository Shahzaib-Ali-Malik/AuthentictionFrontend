import React from 'react'

const EachProducts = ({product,totalStock,handleDelete}) => {
  return  (
              <div 
                className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl flex flex-col justify-between transition-all hover:border-slate-700"
              >
                {/* Product Image & Action Icons Overlay */}
                <div className="relative h-48 bg-slate-950 overflow-hidden group">
                  <img 
                    src={product.images[0] || "https://via.placeholder.com/400"} 
                    alt={product.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  
                  {/* Action Icons Overlay */}
                  <div className="absolute top-3 right-3 flex items-center gap-2">
                    {/* Update Icon Button */}
                    <button
                      onClick={() => handleUpdateClick(product)}
                      title="Update Product"
                      className="p-2.5 bg-slate-900/80 backdrop-blur-md text-indigo-400 hover:bg-indigo-600 hover:text-white rounded-xl shadow-lg transition-all"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                    </button>

                    {/* Delete Icon Button */}
                    <button
                      onClick={() => handleDelete(product._id)}
                      title="Delete Product"
                      className="p-2.5 bg-slate-900/80 backdrop-blur-md text-red-400 hover:bg-red-600 hover:text-white rounded-xl shadow-lg transition-all"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>

                  {/* Price Tag Badge */}
                  <div className="absolute bottom-3 left-3 bg-slate-950/80 backdrop-blur-md border border-slate-800 px-3 py-1.5 rounded-xl text-xs font-bold text-emerald-400">
                    {product.price.currency} {product.price.amount.toLocaleString()}
                  </div>
                </div>

                {/* Content Details */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-bold text-lg text-white mb-1 truncate">{product.title}</h3>
                    <p className="text-sm text-slate-400 line-clamp-2 mb-4">{product.description}</p>
                  </div>

                  <div>
                    {/* Sizes & Stock Summary */}
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {product.sizes.map((s) => (
                        <span 
                          key={s.size} 
                          className="text-xs bg-slate-950 border border-slate-800 px-2.5 py-1 rounded-lg text-slate-300"
                        >
                          <strong className="text-white">{s.size}</strong>: {s.stock}
                        </span>
                      ))}
                    </div>

                    {/* Total Stock Indicator */}
                    <div className="flex justify-between items-center text-xs pt-3 border-t border-slate-800 text-slate-400">
                      <span>Total Stock Status</span>
                      <span className={`font-semibold ${totalStock > 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                        {totalStock > 0 ? `${totalStock} units available` : 'Out of Stock'}
                      </span>
                    </div>
                  </div>
                </div>

              </div>
            );
}

export default EachProducts