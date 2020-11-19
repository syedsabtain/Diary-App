import React from 'react'
import { useState,useEffect } from 'react'
import { Link, Navigate} from 'react-router-dom'
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2'

const Loginhook = ()=> {

    let[id,setID]= useState(0);
   
let[granted,setGranted]= useState(false);
let[change,setChange]= useState(true)

  
    const handleid=()=>{
        fetch("/api/diaryID").then(res=>res.json()).then(data=>{
            
          setID(data[0]+1);
          })
    }
    useEffect(()=>{
     handleid();
          
      },[])
   
       

    type Formdata={
        email: string,
        name: string,
        password: string,
        username: string,
    }
    
    const {register,handleSubmit,errors} = useForm<Formdata>();
    const validateUsername= async (value:any)=>{

            return true
        

    }
    const onSubmit=(data:Formdata)=>{
      
        
        const signupdata = {
            name:data.name,
            username:data.username,
            password:data.password,
            email:data.email,
            diaryID: id
        }

        fetch("/api/signup",{
            method:"POST",
            body: JSON.stringify(signupdata)
        }).then(req=>req.json()).then(data=>{
            
            setChange(data[0])
            if(data[0])
            {
                Swal.fire({
                    title: 'Username Already Exits! try Different one',
                    confirmButtonText: 'OK!'
                  })
            }
        }).catch((error)=> alert(error))
        setGranted(true);
    }

    return(
        <div className='container mt-5'>
            <div className='row'>
                <div className='col-md-5 mx-auto mt-5'>
                    <div id="second">
                        <div className="myform form ">
                            <div className="logo mb-3">
                                <div className="col-md-12 text-center">
                                    <h1>Signup</h1>
                                </div>
                            </div>
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <div className="form-group">
                                    <label>Name</label>
                                    <input type="text" ref={register({required:true,minLength:3, maxLength:20})}
                                        name="name" className="form-control" id="name" aria-describedby="emailHelp"
                                        placeholder="Enter Name" />
                                    {errors.name && errors.name.type ==='required' && (
                                    <h6>This Field is Required</h6>
                                    )}
                                    {errors.name && errors.name.type ==='minLength' && (
                                    <h6>Required min lenght of 3</h6>
                                    )}
                                    {errors.name && errors.name.type==='maxLength' && (
                                    <h6>Max length allowed is 20</h6>
                                    )}
                                </div>
                                <div className="form-group">
                                    <label>Username</label>
                                    <input type="text"
                                        ref={register({required:true,minLength:4,maxLength:10,validate:validateUsername})}
                                        name="username" className="form-control" id="name" aria-describedby="emailHelp"
                                        placeholder="Enter Username" />
                                    {errors.username && errors.username.type==='required' && (
                                    <h6>This Field is Required</h6>
                                    )}
                                    {errors.username && errors.username.type==='minLength' && (
                                    <h6>Required min Length 4</h6>
                                    )}
                                    {errors.username && errors.username.type==='maxLength' && (
                                    <h6>Max length allowed is 10</h6>
                                    )
                                    }
                                    {errors.username && errors.username.type==='validate' && (
                                    <h6>This username already exits</h6>
                                    )}
                                </div>
                                <div className="form-group">
                                    <label>Email address</label>
                                    <input type="email" ref={register({required:true})} name="email"
                                        className="form-control" id="email" aria-describedby="emailHelp"
                                        placeholder="Enter email" />
                                    {errors.email && errors.email.type==='required' && (
                                    <h6>This Field is Required</h6>
                                    )}

                                </div>
                                <div className="form-group">
                                    <label>Password</label>
                                    <input type="password" ref={register({required:true,minLength:8,maxLength:20})}
                                        name="password" id="password" className="form-control"
                                        aria-describedby="emailHelp" placeholder="Enter Password" />
                                    {errors.password && errors.password.type=='required' && (
                                    <h6>This Field is Required</h6>
                                    )}
                                    {errors.password && errors.password.type==='minLength' && (
                                    <h6>Required min Length 8</h6>
                                    )}
                                    {errors.password && errors.password.type==='maxLength' && (
                                    <h6>Max length allowed is 20</h6>
                                    )
                                    }
                                </div>
                                <div className="col-md-12 text-center mb-3">
                                    <button type="submit" className=" btn btn-block mybtn btn-primary tx-tfm">Get
                                        Started For Free</button>
                                </div>
                                <div className="col-md-12 ">
                                    <div className="form-group">
                                        <p className="text-center">
                                            <Link to='../login' id="signin">Already have an account?</Link>
                                        </p>
                                    </div>

                                </div>

                            </form>
                        </div>
                    </div>
                </div>
            </div>
            {granted ? (
                <div>{change ? (
                    null
                ) : (
                    <div><Navigate to='../login' replace={true}></Navigate></div>
                )}</div>
                
            ) : (
               null
            )}

        </div>
    )
}

export default Loginhook