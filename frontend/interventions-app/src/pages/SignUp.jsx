import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { validateEmail } from '../utils/validateEmail'
import axiosInstance from '../utils/axiosInstance'
import PasswordInput from '../components/PasswordInput';
import { GoHomeFill } from "react-icons/go";

export const SignUp = () => {

  const [nom, setNom] = useState("")
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  const handleSignup = async (e) => {
    
    e.preventDefault()

    
    if(!nom){
      setError("Veuillez saisir votre Nom")
      return;
    }

    if(!validateEmail(email)){
      setError("Veuillez saisir une adresse email valide")
      return;
    }

    if(!password){
      setError("Veuillez entrer un mot de passe valide")
      return;
    }

    setError("")

    
    try {
      const response = await axiosInstance.post("/create-account", {
        fullName: nom,
        email: email,
        password: password,
      });

      if (response.data && response.data.accessToken){
        setError(response.data.message)
        return
      }

      if (response.data && response.data.accessToken){
        localStorage.setItem("token", response.data.accessToken)
        navigate("/dashboard")
      }


    } catch (error) {
      
      if (error.response && error.response.data && error.response.data.message) {
        setError(error.response.data.message)
      } else {
        setError("An unexpected error occured. Please try again.")
      }
    }
  }

  const Home = () => {
    navigate('/')
  }
  return (
    <>
    <div className='flex gap-2 items-center p-3 cursor-pointer hover:bg-white hover:rounded shadow-sm hover:text-black' onClick={Home}>
        <GoHomeFill 
        size={30}
        className='cursor-pointer hover:text-slate-700' onClick={Home}/>
        <div className=''>Home</div>
      </div>
    <div className='flex flex-col items-center jusitfy-center mt-20'>
      <div  className='w-96 border rounded bg-white px-7 py-10'>
        <form onSubmit={handleSignup}>
          <h4 className='text-2xl mb-7'>SignUp</h4>

          <input
                type="text" 
                placeholder='Nom' 
                className='w-full text-sm bg-transparent border-[1.5px] px-5 py-3 rounded mb-4 outline-none' 
                value={nom}
                onChange={(e)=>setNom(e.target.value)}
          />

          <input type="email" 
                placeholder='Email' 
                className='w-full text-sm bg-transparent border-[1.5px] px-5 py-3 rounded mb-4 outline-none' 
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
          />

          <PasswordInput value={password} onChange={(e) => setPassword(e.target.value)}/> 

          {error && <p className='text-red-500 text-xs pb-1'>{error}</p>}

          <button type='submit' className='w-full text-sm bg-gray-700 text-white p-2 rounded my-1 hover:bg-gray-600'>
            S'inscrire
          </button>

          <p className='text-sm text-center mt-4'>
          vous avez déjà un compte ?{" "}
           <Link to={'/login'} className='font-medium text-primary underline'>
           se connecter
           </Link>
          </p>

        </form>
      </div>
    </div>
  </>
  )
}

export default SignUp