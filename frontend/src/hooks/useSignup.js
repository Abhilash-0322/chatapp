import React,{useState} from 'react'
// import { IoHandLeft } from 'react-icons/io5';
import { toast } from 'react-hot-toast';    
import { useAuthContext } from '../context/AuthContext';

const useSignup = () => {
    const [loading, setLoading] = React.useState(false);
    const {setAuthUser}=useAuthContext();

    const signup = async ({fullName,username,password,confirmPassword,gender}) => {
        const success=handleInputError(fullName,username,password,confirmPassword,gender);
        if(!success){
            return;
        }
        try{
            const res=await fetch('/api/auth/signup',{
                method:'POST',
                headers:{'Content-Type':'application/json'},
                body:JSON.stringify({fullName,username,password,confirmPassword,gender}),
            });
            const data=await res.json();

            if(data.error){
                throw new Error(data.message);
            }

            //local storage saving
            localStorage.setItem('chat-user',JSON.stringify(data));
            setAuthUser(data);
            toast.success("Signup successful 🎉");
            // document.styleSheets[0].insertRule(`body:before{content:'🎉';position:fixed;top:0;left:0;width:100%;height:100vh;background-color:rgba(0,0,0,0.5);font-size:10rem;color:#fff;display:flex;justify-content:center;align-items:center;z-index:1000;animation:fade 2s forwards;}`);
            // document.styleSheets[0].insertRule(`@keyframes fade{0%{opacity:1;}90%{opacity:1;}100%{opacity:0;}}`);

            console.log(data);
        }
        catch(error){
            toast.error(error.message);
        }
        finally{
            setLoading(false);
        }
    }

    return {loading,signup};
}

export default useSignup


function handleInputError(fullName,username,password,confirmPassword,gender){
    if(fullName==='' || username==='' || password==='' || confirmPassword==''|| gender===''){
        toast.error('Please fill all the fields');
        // alert('Please fill all the fields');
        return false;
    }
    if(password!==confirmPassword){
        toast.error('Passwords do not match');
        // alert('Passwords do not match');
        return false;
    }
    if(password.length<6){
        toast.error('Password must be atleast 6 characters long');
        return false;
    }
    return true;
}