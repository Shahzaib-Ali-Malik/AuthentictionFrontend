import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useApi } from '../../../../config/api';
import { Eye, Lock } from 'lucide-react';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { setAccessToken, setUser } from '../../state/AuthReducer';

function LoginPage() {
  const api = useApi()
  const navigate = useNavigate()
  const {register,handleSubmit,reset, formState:{errors}} = useForm()
  const [showPassword,setShowPassword] = useState(false)
  const dispatch = useDispatch();

  const submitHandle = async (data)=>{
    try {
      const res = await api.post('/auth/login',data);
      console.log(res);
      toast.success("Logged In successfully")
      dispatch(setAccessToken(res.data.data.accessToken))
      reset()
      if(res.data.data.user.role === "seller"){
        navigate('/admin-dashboard')
        dispatch(setUser(res.data.data.user))
      }else{
        navigate('/main')
        dispatch(setUser(res.data.data.user))
      }
    } catch (error) {
      toast.error(error.msg)
    }
  }
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center p-4 selection:bg-emerald-500 selection:text-slate-950">
      <div className="w-full max-w-md bg-slate-900/80 backdrop-blur-xl border border-slate-800/80 rounded-2xl shadow-2xl p-8 space-y-8 relative overflow-hidden">
        
        {/* Decorative background ambient glow */}
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-teal-500/10 rounded-full blur-3xl pointer-events-none"></div>

        {/* Brand Header */}
        <div className="text-center space-y-2 relative z-10">
          <h1 className="text-3xl font-black tracking-widest uppercase bg-gradient-to-r from-white via-slate-200 to-emerald-400 bg-clip-text text-transparent">
            SNITCH
          </h1>
          <p className="text-sm text-slate-400 font-medium">
            Sign in to your account to continue
          </p>
        </div>

        {/* Form Inputs */}
        <form onSubmit={handleSubmit(submitHandle)} className="space-y-5 relative z-10">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold uppercase tracking-wider text-slate-300">
              Email Address
            </label>
            <input 
              {...register("email",{required:true})}
              type="email" 
              placeholder="name@example.com" 
              className="w-full bg-slate-950/60 border border-slate-800 rounded-xl px-4 py-3.5 text-sm text-slate-100 placeholder-slate-600 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all duration-200"
            />
          </div>

          {/* Password Input Field */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold tracking-wider text-slate-300 uppercase">
                  Password
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-500">
                    <Lock className="w-4 h-4" />
                  </div>
                  <input
                    {...register('password',{required:true})}
                    type= {showPassword ? "text" : "password"}
                    placeholder='Secret Password'
                    className="w-full pl-11 pr-12 py-3.5 bg-slate-950/80 border border-slate-800/80 rounded-xl text-sm text-white placeholder-slate-600 focus:outline-none focus:border-emerald-500/80 shadow-inner cursor-default"
                  />
                  <div onClick={()=>setShowPassword(!showPassword)} className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-500">
                    <Eye className="w-4 h-4" />
                  </div>
                </div>
              </div>

          <button 
            type="submit" 
            className="w-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold uppercase tracking-wider text-xs py-4 rounded-xl transition-all duration-200 shadow-lg shadow-emerald-500/20 active:scale-[0.99]"
          >
            Sign In
          </button>
        </form>

        {/* Footer Link */}
        <div className="text-center text-xs text-slate-400 relative z-10">
          Don't have an account?{' '}
          <button onClick={()=>navigate('/')} className="text-emerald-400 font-semibold hover:text-emerald-300 transition-colors cursor-pointer">
            Create account
          </button>
        </div>
      </div>
    </div>
  );
}

export default LoginPage