import React from 'react'
import {useSelector} from 'react-redux'
import {useParams} from 'react-router-dom'
import {Reduxer} from '../interface/all'


const ViewEntries = () => {

    const maindata = useSelector < Reduxer,Reduxer > (state => state)

    const name = useParams()
    
    const newdata = name
        .slug
        .toString();
    const final = newdata.split(',');
    
    return (
        <div className='container mt-5'>
            {maindata
                .publicdiary
                .map((value, key) => {
                    if (value.username === final[1]) {
                        return (
                            <div key={key}>
                                {value
                                    .userdata
                                    .map((val, key) => {
                                        if (val.diaryid === parseInt(final[0])) {
                                            return (
                                                <div key={key} className='row'>{val
                                                        .entries
                                                        .map((valu, key) => {
                                                            return (
                                                                <div className='col-md-8 mx-auto mt-5' key={key}>
                                                                    <div className="card mb-4 box-shadow viewcard">

                                                                        <div className="card-body">
                                                                            <h4 className="card-title ">
                                                                                Title : {valu.title}</h4>
                                                                            <h6 className="card-subtitle  mb-3 mt-3">status : {val.status}</h6>
                                                                            <p className="card-text txtarea">
                                                                                <h4>Description</h4>
                                                                                {valu.description}</p>

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

                })}
        </div>
    )
}

export default ViewEntries