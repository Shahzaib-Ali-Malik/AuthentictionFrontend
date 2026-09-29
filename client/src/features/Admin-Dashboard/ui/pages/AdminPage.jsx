import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import {useApi} from '../../../../config/api'
// Adjust the import path to your custom axios/api instance

const SIZES_OPTIONS = ["XS", "S", "M", "L", "XL", "XXL"];

function AdminPage() {
  const { register, handleSubmit, reset, setValue } = useForm({
    defaultValues: {
      title: '',
      description: '',
      amount: '',
      currency: 'RS',
      sizes: []
    }
  });

  const api = useApi()
  const [images, setImages] = useState([]); // Holds File objects (max 5)
  const [selectedSizes, setSelectedSizes] = useState([]); // Local state for size/stock tracking
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });

  // Handle Image Selection (max 5)
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    if (images.length + files.length > 5) {
      setMessage({ text: 'A product can have at most 5 images', type: 'error' });
      return;
    }
    setMessage({ text: '', type: '' });
    setImages((prev) => [...prev, ...files].slice(0, 5));
  };

  const removeImage = (index) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  // Handle Size Toggling & Stock Updates with react-hook-form setValue
  const handleSizeToggle = (sizeOption) => {
    const exists = selectedSizes.find((s) => s.size === sizeOption);
    let updatedSizes;
    
    if (exists) {
      updatedSizes = selectedSizes.filter((s) => s.size !== sizeOption);
    } else {
      updatedSizes = [...selectedSizes, { size: sizeOption, stock: 0 }];
    }
    
    setSelectedSizes(updatedSizes);
    setValue('sizes', updatedSizes); // Sync with react-hook-form state
  };

  const handleStockChange = (sizeOption, stockVal) => {
    const updatedSizes = selectedSizes.map((s) => 
      s.size === sizeOption ? { ...s, stock: Number(stockVal) } : s
    );
    setSelectedSizes(updatedSizes);
    setValue('sizes', updatedSizes); // Sync with react-hook-form state
  };

  // Form Submit Handler using api.post
  const submitHandle = async (data) => {
    setLoading(true);
    setMessage({ text: '', type: '' });

    try {
      // Create FormData to send files along with structured fields
      const formDataToSend = new FormData();
      formDataToSend.append('title', data.title);
      formDataToSend.append('description', data.description);

      // Package price matching your Mongoose schema structure
      const priceObj = {
        amount: Number(data.amount),
        currency: data.currency
      };
      formDataToSend.append('price', JSON.stringify(priceObj));
      formDataToSend.append('sizes', JSON.stringify(data.sizes));

      // Append image files
      images.forEach((file) => {
        formDataToSend.append('images', file);
      });

      // Using your custom api.post instance with multipart/form-data headers
      const response = await api.post('/products/', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status === 200 || response.status === 201) {
        setMessage({ text: 'Product uploaded successfully!', type: 'success' });
        reset(); // Clears react-hook-form inputs
        setImages([]); // Clear image states
        setSelectedSizes([]); // Clear size states
      }
    } catch (error) {
      const errorMsg = error.response?.data?.message || 'Failed to upload product. Please try again.';
      setMessage({ text: errorMsg, type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto bg-slate-900 border border-slate-800 text-slate-100 p-8 rounded-2xl shadow-xl">
      <h2 className="text-2xl font-bold mb-6 text-indigo-400">Upload New Product</h2>

      {message.text && (
        <div className={`p-4 mb-6 rounded-xl text-sm font-medium ${
          message.type === 'success' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-red-500/10 text-red-400 border border-red-500/20'
        }`}>
          {message.text}
        </div>
      )}

      <form onSubmit={handleSubmit(submitHandle)} className="space-y-6">
        
        {/* Title */}
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">Product Title (2-100 chars)</label>
          <input
            type="text"
            minLength={2}
            maxLength={100}
            {...register("title", { required: true, minLength: 2, maxLength: 100 })}
            placeholder="e.g. Classic Cotton Hoodie"
            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-indigo-600 transition-colors"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">Description (20-500 chars)</label>
          <textarea
            {...register("description", { required: true, minLength: 20, maxLength: 500 })}
            minLength={20}
            maxLength={500}
            rows={4}
            placeholder="Write a detailed product description..."
            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-indigo-600 transition-colors"
          />
        </div>

        {/* Price & Currency */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Price Amount</label>
            <input
              type="number"
              min={0}
              {...register("amount", { required: true, min: 0 })}
              placeholder="e.g. 2500"
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-indigo-600 transition-colors"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Currency</label>
            <select
              {...register("currency", { required: true })}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-indigo-600 transition-colors"
            >
              <option value="RS">RS</option>
              <option value="USD">USD</option>
            </select>
          </div>
        </div>

        {/* Images Upload */}
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">Product Images (Max 5)</label>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleImageChange}
            disabled={images.length >= 5}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-slate-400 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-indigo-600 file:text-white hover:file:bg-indigo-500 transition-all cursor-pointer disabled:opacity-50"
          />
          
          {images.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-3">
              {images.map((file, index) => (
                <div key={index} className="flex items-center gap-2 bg-slate-950 border border-slate-800 px-3 py-2 rounded-xl text-xs text-slate-300">
                  <span className="truncate max-w-[150px]">{file.name}</span>
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="text-red-400 hover:text-red-300 font-bold ml-1"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Sizes & Stock */}
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">Available Sizes & Stock</label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {SIZES_OPTIONS.map((sizeOpt) => {
              const selectedSize = selectedSizes.find((s) => s.size === sizeOpt);
              const isSelected = !!selectedSize;

              return (
                <div key={sizeOpt} className={`p-3 border rounded-xl transition-all ${
                  isSelected ? 'border-indigo-600 bg-indigo-950/20' : 'border-slate-800 bg-slate-950'
                }`}>
                  <label className="flex items-center gap-2 cursor-pointer mb-2">
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => handleSizeToggle(sizeOpt)}
                      className="rounded accent-indigo-600"
                    />
                    <span className="font-semibold text-white">{sizeOpt}</span>
                  </label>
                  
                  {isSelected && (
                    <input
                      type="number"
                      min={0}
                      value={selectedSize.stock}
                      onChange={(e) => handleStockChange(sizeOpt, e.target.value)}
                      placeholder="Stock qty"
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-indigo-600"
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-medium py-3.5 rounded-xl shadow-lg shadow-indigo-600/30 transition-all disabled:opacity-50"
        >
          {loading ? 'Uploading Product...' : 'Upload Product'}
        </button>
      </form>
    </div>
  );
}

export default AdminPage;