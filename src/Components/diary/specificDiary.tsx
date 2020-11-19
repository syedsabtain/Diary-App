import React from 'react'
import { useSelector,useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom';
import { addUserDiary } from '../../Store/Redux/diarySlice';
import { Reduxer } from '../interface/all';
import Swal from 'sweetalert2';

const SpecificDiary =()=>{

    let data = useSelector<Reduxer,Reduxer>(state=>state);
    const dispatch = useDispatch();

    async function handledata(){
       
        const dataget = await fetch('/api/diaryrequest',{
            method: "POST",
            body: JSON.stringify({
                token:data.user.token
            })
        })
        const altedata = await dataget.json()
        dispatch(addUserDiary(altedata))
    }
    const id = useParams();
  

    const handledelete=(diaryid:number,id:number)=>{

        const datase = {
            id:id,
            diaryid:diaryid,
            username:data.user.username,
            token:data.user.token
        }

        fetch('/api/deleteEntries',{
            method:'POST',
            body:JSON.stringify(datase)
        })
        handledata();

    }
    const handleupdate=(diaryid:number,id:number)=>{
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
                input: 'textarea',
                inputPlaceholder: 'Type your message here...',
                inputAttributes: {
                'aria-label': 'Type your message here'
                },
                inputValidator: result=>{
                    if(!result)
                    {
                        return "Enter somthing!"
                    }
                    else {
                        return null
                    }
                    
                },
               showCancelButton: true
            },
           
              
                
           
           
          ]).then((result:any) => {
            if (result.value) {
              const answers = JSON.stringify(result.value)
              const finaldata = JSON.parse(answers)
              const datase = {
                id:id,
                diaryid:diaryid,
                username:data.user.username,
                token:data.user.token,
                title:finaldata[0],
                description:finaldata[1]
            }
            fetch('/api/updateEntries',{
                method:"POST",
                body:JSON.stringify(datase)
            })
            handledata();
              Swal.fire({
                title: 'All done! UPDATED',
                confirmButtonText: 'OK!'
              })
            }
          })


        
    }

    const AddEntries=(did:number)=>{
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
                input: 'textarea',
                inputPlaceholder: 'Type your message here...',
                inputAttributes: {
                'aria-label': 'Type your message here'
                },
                inputValidator: result=>{
                    if(!result)
                    {
                        return "Enter somthing!"
                    }
                    else {
                        return null
                    }
                    
                },
               showCancelButton: true
            },
           
              
                
           
           
          ]).then((result:any) => {
            if (result.value) {
              const answers = JSON.stringify(result.value)
              const finaldata = JSON.parse(answers)
              const datase = {
                title:finaldata[0],
                description:finaldata[1],
                diaryid:did,
                DiaryID:data.diary.diaryID,
                username:data.diary.username,
                token:data.user.token
            }
            fetch('/api/addentries',{
                method: "POST",
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

    return(
        <div className='container mt-5 mx-auto'>
          
            <div>
                {data.diary.diary?.map((value,key)=>{
                 if(value.diaryid === parseInt(id.slug)){
                    
                    return(
                        <div key={key} className='mt-5'>
                            
                            <button className="card-link btn btn-outline-danger mb-5 "
                                onClick={()=>{AddEntries(parseInt(id.slug))}}>Add Entries</button>
                            <h4 className='hhome'>Diary Title : {value.diarytitle}</h4>
                            <h6 className='hhome'>status : {value.status}</h6>
                            <h1 className='mt-5 mb-5 hhome'>Entries</h1>
                            <div className='row'>
                    {value.entries.map((val,key)=>{

                        return(
                            <div key={key} className='col-md-4'>

                                <div className="card mb-4 box-shadow viewcard shadow-lg">

                                    <div className="card-body">
                                        <h4 className="card-title">Title : {val?.title}</h4>
                                        <h6 className="card-subtitle mb-2 ">status : {value?.status}</h6>
                                        <p className="card-text txtarea">
                                            <h4>Description</h4> {val.description}
                                        </p>

                                        <button className="card-link btn btn-danger btn-sm"
                                            onClick={()=>{handledelete(value?.diaryid,val.id)}}>Delete</button>
                                        <button className="card-link btn btn-danger btn-sm"
                                            onClick={()=>{handleupdate(value?.diaryid,val.id)}}>Update</button>
                                    </div>



                                </div>
                            </div>
                        )
                    })}</div>
                        </div>

                    )
                 }
                })}
            </div>
            
        </div>
    )
}


export default SpecificDiary