import React,{FC, useEffect} from 'react'

import { Link, Navigate } from 'react-router-dom';
import {useSelector,useDispatch} from 'react-redux'
import { login } from '../../Store/Redux/userSlice';
import {Reduxer} from '../interface/all'
import Swal from 'sweetalert2'
import {useForm} from 'react-hook-form'
const Login:FC =()=>{
   

    
    const disptach = useDispatch();
    const value = useSelector<Reduxer,Reduxer>(state=>state);
   
   
    
    type formdata={
        username:string,
        password:string,
    }
    const {register,handleSubmit,errors,formState:{isSubmitSuccessful},reset} = useForm<formdata>();
    
    const onSubmit =(data:formdata)=>{
        const dataget = {
            username:data.username,
            password:data.password
        }
        fetch("/api/signin",{
            method: "POST",
            body: JSON.stringify(dataget)
        }).then((res)=> res.json()).then((data)=>{
            
            
            
            
         
       
           

            if(data[0]===false)
            {
                Swal.fire({
                    title: 'Wrong username or Password try again',
                    confirmButtonText: 'OK!'
                  })
            }
            else{
                disptach(login({
                    token: data[0],
                    isAuthenticated: data[2],
                    username:data[1],
                    
                }));
            }
            
        })
        .catch((error)=>{
            
        });
 

    }
    useEffect(()=>{
        if(isSubmitSuccessful){
            reset()
        }
    },[isSubmitSuccessful,reset])
  
   
    return(

        <div className="container mt-5">
            {value.user.isAuthenticated ? <Navigate to='/' replace={true}></Navigate> : null}
            <div className="row">
                <div className="col-md-5 mx-auto mt-3">
                    <div id="first" className='login'>

                        <div className="myform form ">
                            <div className="logo mb-3">
                                <div className="col-md-12 text-center">
                                    <h1>Login</h1>
                                </div>
                            </div>
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <div className="form-group">
                                    <label>Username</label>
                                    <input type="text" name="username" className="form-control" id="username"
                                        aria-describedby="username" placeholder="Enter Username"
                                        ref={register({required:true,minLength:4})} />
                                    {errors.username && errors.username.type ==='required' && (<h6
                                        className='mt-1 rederror'>*This field is Required</h6>)}
                                    {errors.username && errors.username.type ==='minLength' && (
                                    <h6 className='mt-1 rederror'>*This field is required min length of 4</h6>
                                    )}
                                </div>
                                <div className="form-group">
                                    <label>Password</label>
                                    <input type="password" name="password" id="password" className="form-control"
                                        aria-describedby="emailHelp" placeholder="Enter Password"
                                        ref={register({required:true,minLength:8})} />
                                    {errors.password && errors.password.type ==='required' && (
                                    <h6 className='mt-1 rederror'>*This field is Required</h6>
                                    )}
                                    {errors.password && errors.password.type==='minLength' && (
                                    <h6 className='mt-1 rederror'>*This field is required min length of 8</h6>
                                    )}
                                </div>
                                <div className="form-group">
                                    <p className="text-center">By signing up you accept our <a href=''>Terms Of Use</a>
                                    </p>
                                </div>
                                <div className="col-md-12 text-center ">
                                    <button type="submit"
                                        className=" btn btn-block mybtn btn-primary tx-tfm">Login</button>
                                </div>
                                <div className="col-md-12 ">
                                    <div className="login-or">
                                        <hr className="hr-or" />
                                        <span className="span-or">or</span>
                                    </div>
                                </div>
                                <div className="col-md-12 mb-3">
                                    <p className="text-center">
                                        <a className="google text-white" href=''><i className="fa fa-google-plus">
                                            </i> Signup using Google
                                        </a>
                                    </p>
                                </div>
                                <div className="form-group">
                                    <p className="text-center">Don't have account?
                                        <Link to='../signup' id="signup">Sign up here</Link>
                                    </p>
                                </div>
                            </form>

                        </div>
                    </div>

                </div>
            </div>
        </div>
    )



}
export default Login;