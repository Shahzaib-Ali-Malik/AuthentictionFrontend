import React from 'react';
import { NavLink, useNavigate } from 'react-router'; // or 'react-router-dom' depending on your setup
import { useApi } from '../../../../config/api';
import { useDispatch } from 'react-redux';
import { setUser } from '../../../Auth/state/AuthReducer';

function Sidebar() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const api = useApi()
    const logout = async ()=>{
        const res = await api.post('/auth/logout');
        console.log(res);   
        dispatch(setUser(null));
        navigate("/login")
    }
  return (
    <aside className="w-64 bg-slate-900 text-slate-300 flex flex-col justify-between h-auto border-r border-slate-800 shadow-xl">
      
      {/* Top Section: Brand & Navigation Links */}
      <div className="p-6">
        {/* Brand / Title */}
        <div className="flex items-center gap-3 mb-8 px-2">
          <div className="bg-indigo-600 text-white font-bold p-2 rounded-lg text-sm">
            AD
          </div>
          <span className="text-white font-semibold text-lg tracking-wide">
            Admin Panel
          </span>
        </div>

        {/* Navigation Links */}
        <nav className="space-y-2">
          {/* Products Link */}
          <NavLink
            to="/admin-dashboard/products" // Update to match your actual route
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all ${
                isActive
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
                  : 'hover:bg-slate-800 text-slate-400 hover:text-white'
              }`
            }
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
            </svg>
            Products
          </NavLink>

          {/* Upload Link */}
          <NavLink
            to="/admin-dashboard/" // Update to match your actual route
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all ${
                isActive
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
                  : 'hover:bg-slate-800 text-slate-400 hover:text-white'
              }`
            } end
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
            </svg>
            Upload
          </NavLink>
        </nav>
      </div>

      {/* Bottom Section: Logout Button */}
      <div className="p-6 border-t border-slate-800">
        <button
          onClick={() => logout()}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-all"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
          Logout
        </button>
      </div>

    </aside>
  );
}

export default Sidebar