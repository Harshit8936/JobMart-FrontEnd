import React, { useState,useEffect } from 'react'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { RadioGroup } from '../ui/radio-group'
import { Button } from '../ui/button'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { USER_API_END_POINT } from '@/utils/constants'
import { toast } from 'sonner'
import { useDispatch, useSelector } from 'react-redux'
import { setLoading } from '@/redux/authSlice'
import { Loader2 } from 'lucide-react'

export default function Signup() {
    const [input,setInput] = useState({
        fullname:"",
        phone:"",
        email:"",
        password:"",
        role:"",
        profilePhoto:""
    })
    const {loading,user} = useSelector(store=>store.auth)
    const handleOnchangeInput = (e)=>{
        setInput({...input,[e.target.name]:e.target.value})
    }
    const changeFileHandler = (e)=>{
        setInput({...input, profilePhoto:e.target.files?.[0]})
    }
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleForm = async(e)=>{
        e.preventDefault();
        const formData = new FormData();
        formData.append("fullname",input.fullname)
        formData.append("email",input.email)
        formData.append("phone",input.phone)
        formData.append("password",input.password)
        formData.append("role",input.role)
        if(input.profilePhoto){
            formData.append("profilePhoto",input.profilePhoto)
        }
        try {
            dispatch(setLoading(true));
            const res = await axios.post(`${USER_API_END_POINT}/register`,formData,{
                headers:{
                    "Content-Type":"multipart/form-data"
                },
            })
            if(res.data.success){
                setInput({fullname:"",phone:"", email:"", password:"", role:"", file:""});
                toast.success(res.data.message ? res.data.message: "Register Success");
                navigate("/login");
            }
        } catch (error) {
            toast.error(error.response.data.message)
        }finally{
            dispatch(setLoading(false))
        }
    }
    useEffect(()=>{
        if(user){
            navigate("/")
        }
    },[])

    return (
        <div className='flex items-center justify-center max-w-7xl mx-auto'>
            <form method='post' onSubmit={handleForm} className='w-1/2 border border-gray-200 rounded-md p-4 my-10'>
                <h1 className='flex font-bold text-xl mb-5'>Sign Up</h1>
                <div className='my-2'>
                    <Label className='flex my-2' htmlFor="fullname">Full Name</Label>
                    <Input type="text" placeholder="Enter your full name" name="fullname" value={input.fullname} onChange={handleOnchangeInput} required/>
                </div>
                <div className='my-2'>
                    <Label className='flex my-2' htmlFor="email">Email</Label>
                    <Input type="email" placeholder="Enter your Email" name="email" value={input.email} onChange={handleOnchangeInput} required/>
                </div>
                <div className='my-2'>
                    <Label className='flex my-2' htmlFor="phone">Phone number</Label>
                    <Input type="number" placeholder="Enter your Phone Number" name="phone" value={input.phone} onChange={handleOnchangeInput} required/>
                </div>
                <div className='my-2'>
                    <Label className='flex my-2' htmlFor="password">Password</Label>
                    <Input type="password" placeholder="Enter your Password" name="password" value={input.password} onChange={handleOnchangeInput} required/>
                </div>
                <div className='flex items-center justify-between'>
                    <RadioGroup className="flex items-center gap-4 my-5">
                        <div className="flex items-center space-x-2">
                            <Input type="radio" name="role" value="student" className="cursor-pointer" checked={input.role==='student'} onChange={handleOnchangeInput}/>
                            <Label htmlFor="student">Student</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                        <Input type="radio" name="role" value="recruiter" className="cursor-pointer" checked={input.role==='recruiter'} onChange={handleOnchangeInput}/>
                        <Label htmlFor="recruiter">Recruiter</Label>
                        </div>
                    </RadioGroup>
                    <div className='flex items-center gap-2'>
                    <Input type="file" name="profilePhoto" accept="image/*" className="cursor-pointer" onChange={changeFileHandler}/>
                </div>
                </div>
                {loading ? 
                <Button className='w-full my-4'><Loader2 className='mr-2 h-4 w-4 animate-spin'/>Loading</Button> : 
                <Button type="submit" className='w-full my-4' >SignUp</Button>}
                <span className='flex'>Alreaday have an account ? <Link to="/login" className='text-blue-600'>Login</Link></span>
            </form>
        </div>
    )
}
