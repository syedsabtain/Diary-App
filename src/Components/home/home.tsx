import React from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {useEffect} from 'react'
import {publicAddDiary} from '../../Store/Redux/publicDiary'
import {Reduxer} from '../interface/all'
import {Link} from 'react-router-dom'

const Home = () => {
        const publicdata = useSelector < Reduxer,Reduxer > (state => state)
        const dispatch = useDispatch()
       
    

      

        useEffect(() => {
            fetch('/api/publicdiary').then((res) => res.json()).then((data) => {
                
                dispatch(publicAddDiary(data))
            })

        }, [])
        interface objj {

            username : string,
            diaryID : number[]

        }
        
        
        return (
            <div className='container mt-5 '>
                <div className='row'>
                    <div className='col-md-5 mx-auto mt-5'>
                        <h1 className='hhome'>Public Diary of Users</h1>

                    </div>

                </div>
                <div>
                    <div className="container mt-5">
                        <div className="row mt-5">
                            {publicdata
                                .publicdiary
                                .map((value, key) => {
                                    return (
                                        <div className='col-md-4' key={key}>
                                            <div className="card mb-4 box-shadow viewcard shadow-lg">

                                                <div className="card-body">
                                                    <h5 className="card-title">Username : {value.username}</h5>
                                                    <h6 key={key} className="card-subtitle mb-2 ">Total Diaries : {value.userdata
                                                            ?.length}</h6>

                                                    <Link className="card-link btn btn-danger btn-sm mt-4" to={`${value.username}`}>View Diary</Link>

                                                </div>

                                            </div>
                                        </div>
                                    )
                                })}

                        </div>
                    </div>
                </div>

            </div>
        )
    }

    export default Home