import React, { useState } from 'react';
import { 
  Lock, 
  Mail, 
  User, 
  Sparkles, 
  ShieldCheck, 
  ArrowRight,
  Eye
} from 'lucide-react';
import {useNavigate} from 'react-router'
import { useForm } from 'react-hook-form'
import {  useApi } from '../../../../config/api';
import { toast } from 'react-toastify';

function RegisterPage() {
    const api = useApi()
    const navigate = useNavigate();
    let [showPassword,setShowPassword] = useState(false)
    let [showConfirmPassword,setShowConfirmPassword] = useState(false)
    const {register,handleSubmit,formState:{errors},reset} = useForm()
    const [allErrors,setAllErrors] = useState({})

    const submitHandle = async (data)=>{
        try {
            const res = await api.post('/auth/register', data);
            toast.success("User Registered Successfully")
            reset()
        } catch (error) {
            setAllErrors({error})
        }
        
        
    }
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between selection:bg-emerald-500 selection:text-slate-950 font-sans antialiased relative overflow-hidden">
      
      {/* Modern gradient ambient background glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-emerald-600/15 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-teal-600/10 rounded-full blur-[120px] pointer-events-none"></div>

      {/* Header navigation bar */}
      <header className="w-full px-6 md:px-12 py-6 flex items-center justify-between border-b border-slate-900/80 backdrop-blur-md z-20">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-400 to-teal-600 flex items-center justify-center shadow-lg shadow-emerald-900/30">
            <span className="text-slate-950 font-black text-lg tracking-tighter">S</span>
          </div>
          <span className="text-xl font-extrabold tracking-widest text-white">
            SNITCH
          </span>
        </div>
        
        <div className="flex items-center gap-3 text-xs font-medium text-slate-400">
          <span className="hidden sm:inline">Already have an account?</span>
          <button onClick={()=>navigate('/login')} className="text-emerald-400 font-semibold tracking-wider px-3 py-1.5 rounded-lg border border-emerald-500/20 bg-emerald-500/5">
            SIGN IN
          </button>
        </div>
      </header>

      {/* Main Form Center Section */}
      <main className="flex-1 flex items-center justify-center px-4 py-12 z-10">
        <div className="w-full max-w-lg mx-auto">
          
          {/* Brand Introduction Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/80 border border-slate-800 text-xs font-medium text-emerald-400 mb-4 shadow-inner">
              <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
              <span>Next-Gen Streetwear & Luxury Club</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-2 font-serif">
              Join the Movement
            </h1>
            <p className="text-sm text-slate-400 max-w-sm mx-auto">
              Create your Snitch profile for early drop access, personalized styling, and rewards.
            </p>
          </div>

          {/* Form Card Layout */}
          <form onSubmit={handleSubmit(submitHandle)} className="bg-slate-900/50 border border-slate-800/80 backdrop-blur-2xl p-6 sm:p-8 rounded-3xl shadow-2xl relative">
            
            <div className="space-y-5">
              
              {/* Name Input Field */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold tracking-wider text-slate-300 uppercase">
                  Full Name
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-500">
                    <User className="w-4 h-4" />
                  </div>
                  <input
                    {...register('name',{required:true})}
                    type="text"
                    placeholder='Name'                  
                    className="w-full pl-11 pr-4 py-3.5 bg-slate-950/80 border border-slate-800/80 rounded-xl text-sm text-white placeholder-slate-600 focus:outline-none focus:border-emerald-500/80 shadow-inner cursor-default"
                  />
                </div>
                  {allErrors?.error?.path === 'name' && <div className='text-red-500'>{allErrors.error.msg}</div> }
              </div>

              {/* Email Input Field */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold tracking-wider text-slate-300 uppercase">
                  Email Address
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-500">
                    <Mail className="w-4 h-4" />
                  </div>
                  <input
                    {...register('email',{required:true})}
                    type="email"
                    placeholder='example@gmail.com'
                    className="w-full pl-11 pr-4 py-3.5 bg-slate-950/80 border border-slate-800/80 rounded-xl text-sm text-white placeholder-slate-600 focus:outline-none focus:border-emerald-500/80 shadow-inner cursor-default"
                  />
                </div>
                  {allErrors?.error?.path === 'email' && <div className='text-red-500'>{allErrors.error.msg}</div> }
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
                  {allErrors?.error?.path === 'password' && <div className='text-red-500'>{allErrors.error.msg}</div> }

              </div>

              {/* Confirm Password Input Field */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold tracking-wider text-slate-300 uppercase">
                  Confirm Password
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-500">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <input
                    {...register('confirmPassword',{required:true})}
                    type= {showConfirmPassword ? "text" : "password"}
                    placeholder='Secret Password'
                    className="w-full pl-11 pr-12 py-3.5 bg-slate-950/80 border border-slate-800/80 rounded-xl text-sm text-white placeholder-slate-600 focus:outline-none focus:border-emerald-500/80 shadow-inner cursor-default"
                  />
                  <div className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-500">
                    <Eye onClick={()=>setShowConfirmPassword(!showConfirmPassword)} className="w-4 h-4" />
                  </div>
                </div>
                  {allErrors.error?.path === 'confirmPassword' && <div className='text-red-500'>{allErrors.error.msg}</div> }
              </div>

              {/* Terms agreement text */}
              <p className="text-[11px] text-slate-400 leading-relaxed pt-1">
                By joining, you agree to Snitch's{' '}
                <span className="text-emerald-400 underline">Terms</span> &{' '}
                <span className="text-emerald-400 underline">Privacy Policy</span>.
              </p>

              {/* Static Submit Button Presentation */}
              <button type='submit' className="w-full mt-2 py-4 bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 font-bold tracking-widest text-xs uppercase rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/25 cursor-default">
                <span>Complete Registration</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>

        </div>
      </main>

      {/* Footer copyright */}
      <footer className="w-full py-6 text-center text-xs text-slate-500 border-t border-slate-900 z-10">
        <p>&copy; 2026 SNITCH FASHION CLUB. ALL RIGHTS RESERVED.</p>
      </footer>

    </div>
  );
}

export default RegisterPage