import React, { useState } from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Navigate } from 'react-router-dom'
import { addUserDiary } from '../../Store/Redux/diarySlice'
import { Reduxer } from '../interface/all'
import Swal from 'sweetalert2';

const UserDiary = ()=>{

    const islogin = useSelector<Reduxer,Reduxer>(state=>state)
    const dispatch = useDispatch();

    async function handledata(){
       
        const data = await fetch('/api/diaryrequest',{
            method: "POST",
            body: JSON.stringify({
                token:islogin.user.token
            })
        })
        const altedata = await data.json()
        dispatch(addUserDiary(altedata))
    }
    useEffect(()=>{

      
        handledata();
        setUsername({
          username:islogin.user.username,
          token:islogin.user.token
  
      })
    },[])

   const  handledelete =(id:number)=>{
    const data = {
        diaryid:id,
        username:islogin.user.username,
        token:islogin.user.token
    }
    fetch('/api/deletediary',{
        method:"POST",
        body:JSON.stringify(data)
    })
    handledata();
   }
   const inputOptions = new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        'public': 'Public',
        'private': 'Private',
        
      })
    }, 1000)
  })
   const handleupdate =(diaryid:number)=>{
    const data =   Swal.mixin({
        input: 'text'||'radio',
        confirmButtonText: 'Next &rarr;',
        showCancelButton: true,
        progressSteps: ['1', '2'],
       
      }).queue([
        {
          title: 'Enter Diary Title',
          inputValidator: result=>{
            if(!result)
            {
                return "Enter somthing!"
            }
            else {
                return null
            }
            
        }
        
        },
         {
            title: "Select Status",
            input:'radio' ,
            inputOptions:inputOptions,
            inputValidator: result=>{
                if(!result)
                {
                    return 'You need to choose something!'
                }
                else return null
            }
        },
       
          
            
       
       
      ]).then((result:any) => {
        if (result.value) {
          const answers = JSON.stringify(result.value)
          const finaldata = JSON.parse(answers)
          
          const datase = {
                
            diaryid:diaryid,
            username:islogin.user.username,
            token:islogin.user.token,
            Diarytitle:finaldata[0],
            status:finaldata[1]
        }

        fetch('/api/updateDiary',{
            method:'POST',
            body: JSON.stringify(datase)
        })
        handledata();
        Swal.fire({
            title: 'All done! UPDATED',
            confirmButtonText: 'OK!'
          })
        }
      })
    

    }
    const AddDiary=()=>{
        Swal.mixin({
            input: 'text'||'radio',
            confirmButtonText: 'Next &rarr;',
            showCancelButton: true,
            progressSteps: ['1', '2'],
           
          }).queue([
            {
              title: 'Enter Diary Title',
              inputValidator: result=>{
                if(!result)
                {
                    return "Enter somthing!"
                }
                else {
                    return null
                }
                
            }
         
            },
             {
                title: "Select Status",
                input:'radio' ,
                inputOptions:inputOptions,
                inputValidator: result=>{
                    if(!result)
                    {
                        return 'You need to choose something!'
                    }
                    else return null
                }
            },
           
              
                
           
           
          ]).then((result:any) => {
            if (result.value) {
              const answers = JSON.stringify(result.value)
              const finaldata = JSON.parse(answers)
              
              const datase = {
                diarytitle:finaldata[0],
                status:finaldata[1],
                token:islogin.user.token,
                username:islogin.user.username
            }
            fetch('/api/diaryadd',{
                method:"POST",
                body: JSON.stringify(datase)
            })
            handledata();
              Swal.fire({
                title: 'All done! UPDATED',
                confirmButtonText: 'OK!'
              })
            }
          })

    }
    type Inputdata= {
      value:[]
    }
    let [username,setUsername]= useState({
      username:'',
      token:''
  })
    const Addmaindiary=()=>{

      Swal.mixin({
        input: 'text'||'radio',
        confirmButtonText: 'Next &rarr;',
        showCancelButton: true,
        progressSteps: ['1', '2'],
       
      }).queue([
        {
          title: 'Enter Diary Title',
          inputValidator: result=>{
            if(!result)
            {
                return "Enter somthing!"
            }
            else {
                return null
            }
            
        }
        //   text: 'Chaining swal2 modals is easy'
        },
         {
            title: "Select Status",
            input:'radio' ,
            inputOptions:inputOptions,
            inputValidator: result=>{
                if(!result)
                {
                    return 'You need to choose something!'
                }
                else return null
            }
        },
       
          
            
       
       
      ]).then((result:any) => {
        
        if (result.value) {
          const answers = JSON.stringify(result.value)
          const finaldata = JSON.parse(answers)
          
          
          const database={
                    diarytitle:finaldata[0],
                    status:finaldata[1],
                    diaryid:0,
                    username:username.username,
                    token:username.token
          }
          fetch('api/adddiary',{
            method:"POST",
            body: JSON.stringify(database)
        })
        handledata();
          Swal.fire({
            title: 'All done! UPDATED',
            confirmButtonText: 'OK!'
          })
        }
      })

    }

    return(
       <div className='container mt-5'>
           {islogin.user.isAuthenticated ? (
             
               
                    <div className=' mt-5 mx-auto'>

                      {islogin.diary.username === '' || islogin.diary.diaryID === undefined ? (
                      <div>


                        <button onClick={Addmaindiary} className='btn btn-outline-danger mb-5 mt-5'>Add Diary</button>
                      </div>
            ) : (
                <div className='container mt-5 '>
                
                  <button onClick={AddDiary} className='btn btn-outline-danger mb-5 mt-5'>Add Diary</button>

                  <div className='row'>
                    {islogin.diary.diary?.map((value,key)=>{
                    return(
                    <div className='col-md-4' key={key}>
                      <div className="card mb-4 box-shadow viewcard shadow-lg">

                        <div className="card-body">
                          <h5 className="card-title">Diary Title : {value?.diarytitle}</h5>
                          <h6 className="card-subtitle mb-2 ">status : {value?.status}</h6>
                          <p className="card-text">Entries : {value?.entries.length}</p>
                          <Link className="card-link btn btn-danger btn-sm" to={`${value?.diaryid}`}>View Entries</Link>
                          <button className="card-link btn btn-danger btn-sm"
                            onClick={()=>{handledelete(value?.diaryid)}}>Delete</button>
                          <button className="card-link btn btn-danger btn-sm"
                            onClick={()=>{handleupdate(value?.diaryid)}}>Update</button>



                        </div>



                      </div>
                    </div>
                        )
                    })}</div>
                </div>
            )}
                        
                    </div>
                
    
           ) : (
               <Navigate to='../login' replace={true}></Navigate>
           )}
       </div>
    )
}

export default UserDiary