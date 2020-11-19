import React from 'react';

import './App.css';
import {BrowserRouter as Router,Routes,Route,Link} from 'react-router-dom'
import Home from '../home/home';
import Login from '../login/login';
import Signup from '../signup/signup';
import { useDispatch, useSelector } from 'react-redux';
import {logout} from '../../Store/Redux/userSlice'
import UserDiary from '../diary/userDiary';
import { Reduxer } from '../interface/all';
import SpecificDiary from '../diary/specificDiary';
import ViewDiary from '../home/ViewDiary';
import ViewEntries from '../home/ViewEntries';

import NotFound from '../public/notFound';
const App = () => {
   
    const islogin = useSelector<Reduxer,Reduxer>(state=>state)
    const dispatch = useDispatch()
    const logoutt=()=>{
        dispatch(logout({}));
        fetch('/api/logout');
    }
    return (
        <div className="App ">

         <Router>
         {islogin.user.isAuthenticated ? (<nav className="navbar navbar-expand-lg navbar-light bg-light bg-transparent">
                <a className="navbar-brand navlogo" href="#">Diary</a>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-toggle="collapse"
                    data-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded="false"
                    aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse  justify-content-end" id="navbarNav">
                    <ul className="navbar-nav ">
                        <li className='nav-item'>
                            <span className='nav-link navlink'>{islogin.user.username}</span>
                        </li>
                        <li className="nav-item active">
                            <Link className="nav-link navlink" to='/'>Home
                                <span className="sr-only">(current)</span>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link navlink" to='userdiary'>MyDiary</Link>
                        </li>
                        <li className="nav-item">
                            <button className="nav-link border-0 bg-transparent mx-auto navlink" onClick={logoutt} >logout</button>
                        </li>
                       
                    </ul>
                </div>
            </nav>) : (<nav className="navbar navbar-expand-lg navbar-light bg-light bg-transparent">
                <a className="navbar-brand navlogo" href="#">Diary</a>
                <button
                    className="navbar-toggler  "
                    type="button"
                    data-toggle="collapse"
                    data-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded="false"
                    aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon "></span>
                </button>
                <div className="collapse navbar-collapse   justify-content-end" id="navbarNav">
                    <ul className="navbar-nav ">
                        <li className="nav-item active">
                            <Link className="nav-link navlink" to='/'>Home
                                <span className="sr-only">(current)</span>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link navlink" to='login'>Login</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link navlink" to='signup'>Signup</Link>
                        </li>
                      
                       
                    </ul>
                </div>
            </nav>)}
            <Routes>
              <Route path='/' >
              <Route path='/' element={<Home></Home>}></Route>
              <Route path=':slug' >
              <Route path='/' element={<ViewDiary></ViewDiary>}></Route>
              <Route path=':slug' element={<ViewEntries></ViewEntries>}></Route>
            
              </Route>

              </Route>
              <Route path='login' element={<Login></Login>}></Route>
              <Route path='signup' element={<Signup></Signup>}></Route>
              <Route path='userdiary' >
              <Route path='/' element={<UserDiary></UserDiary>}></Route>

              <Route path=':slug' >
              <Route path='/' element={<SpecificDiary></SpecificDiary>}></Route>
              
              </Route>

              </Route>
              
              
              
              
              <Route path='*' element={<NotFound></NotFound>}></Route>

              
              
              
            </Routes>

            
         </Router>
         
<footer className="page-footer font-small text-white">


  <div className="container">


    <div className="row">


      <div className="col-md-12 py-5">
        <div className=" flex-center">


          <a className="fb-ic">
            <i className="fab fa-facebook-f fa-lg white-text mr-md-5 mr-3 fa-2x"> </i>
          </a>

          <a className="tw-ic">
            <i className="fab fa-twitter fa-lg white-text mr-md-5 mr-3 fa-2x"> </i>
          </a>

          <a className="gplus-ic">
            <i className="fab fa-github fa-lg white-text mr-md-5 mr-3 fa-2x"> </i>
          </a>

          <a className="li-ic">
            <i className="fab fa-linkedin-in fa-lg white-text mr-md-5 mr-3 fa-2x"> </i>
          </a>

          <a className="ins-ic">
            <i className="fab fa-instagram fa-lg white-text mr-md-5 mr-3 fa-2x"> </i>
          </a>

          <a className="pin-ic">
            <i className="fab fa-pinterest fa-lg white-text fa-2x"> </i>
          </a>
        </div>
      </div>


    </div>


  </div>



  <div className="footer-copyright text-center py-3 hhome">© 2020 Copyright: Syed Sabtain
    
  </div>


</footer>
</div>
       
    );
}

export default App;
