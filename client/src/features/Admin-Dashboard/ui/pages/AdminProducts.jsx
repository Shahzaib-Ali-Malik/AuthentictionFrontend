import React, { useState } from 'react';
import { useApi } from '../../../../config/api';
import { useEffect } from 'react';
import EachProducts from '../components/EachProducts';
import { toast } from 'react-toastify';



function AdminProducts() {
  const [products, setProducts] = useState([]);
  const api = useApi()
  const getAllProducts = async ()=>{
    const res = await api.get('/products/');
    setProducts(res.data.data.product)
  }

  useEffect(()=>{
    getAllProducts()
  },[])

  const handleDelete = async (id) => {
    try {
      const res = await api.delete(`/products/${id}`)
      getAllProducts()
      toast.success("User Deleted Successfully")
    } catch (error) {
      toast.error(error)
    }
  };

  const handleUpdateClick = (product) => {
    // Trigger update modal or navigate to edit page
    console.log("Update product:", product._id);
  };

  return (
    <div className="max-w-6xl mx-auto text-slate-100 p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-2xl font-bold text-indigo-400">My Products</h2>
          <p className="text-sm text-slate-400 mt-1">Manage, update, or remove your listed products.</p>
        </div>
        <span className="bg-slate-900 border border-slate-800 px-4 py-2 rounded-xl text-sm font-medium text-slate-300">
          Total: {products.length}
        </span>
      </div>

      {/* Products Grid */}
      {products.length === 0 ? (
        <div className="text-center py-16 bg-slate-900/50 border border-slate-800 rounded-2xl">
          <p className="text-slate-400">No products found. Start by uploading one!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => {
            const totalStock = product.sizes.reduce((acc, curr) => acc + curr.stock, 0);

            return <EachProducts key={product._id} handleDelete={handleDelete} totalStock={totalStock} product={product}/>
          })}
        </div>
      )}
    </div>
  );
}

export default AdminProducts