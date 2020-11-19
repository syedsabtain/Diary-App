import React from 'react'
import {useSelector} from 'react-redux'
import {Link, useParams} from 'react-router-dom'
import {Reduxer} from '../interface/all'

const ViewDiary = () => {

    const maindata = useSelector < Reduxer,
        Reduxer > (state => state)
    const username = useParams();
    return (
        <div className='container mt-5'>
            {maindata.publicdiary.map((value, key) => {

                    if (value.username === username.slug) {
                        return (
                            <div className='row m-5' key={key}>{value
                                    .userdata
                                    .map((val, key) => {
                                        return (
                                            <div className='col-md-4 mx-auto mt-5' key={key}>
                                                <div className="card mb-4 box-shadow shadow-lg viewcard">

                                                    <div className="card-body">
                                                        <h5 className="card-title">Diary Title : {val.diarytitle}</h5>
                                                        <h6 className="card-subtitle mb-2 ">status : {val.status}</h6>
                                                        <p className="card-text">Entries : {val.entries.length}</p>
                                                        <Link
                                                            className="card-link btn btn-danger btn-sm"
                                                            to={`${val.diaryid + ',' + username.slug}`}>View Entries</Link>

                                                    </div>

                                                </div>
                                            </div>
                                        )
                                    })}</div>
                        )
                    }
                })}
        </div>
    )
}

export default ViewDiary
