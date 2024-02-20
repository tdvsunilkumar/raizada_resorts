import './App.css';
import Login from './components/admin/Auth/Login/Login';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import NotFound from './components/admin/NotFound/NotFound';
import Register from './components/admin/Auth/Register/Register';
import ForgotPassword from './components/admin/Auth/ForgotPassword/ForgotPassword';
import { ToastContainer } from 'react-toastify';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import Dashboard from './components/admin/Dashboard/Dashboard';
import AuthProtectedRoutes from './components/admin/AuthProtectedRoutes/AuthProtectedRoutes';


function App() {
  const isLogged = localStorage.getItem('access-token');
  return (
   <BrowserRouter>
   <ToastContainer
            closeButton
            position="top-center"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            pauseOnHover
            theme="colored"
          />
          
   <Routes>
    
    <Route path='/admin' element={(isLogged != '')?<Navigate to='/admin/dashboard' />:<Login />}></Route>
    <Route path='/admin/login' element={(isLogged != '')?<Navigate to='/admin/dashboard' />:<Login />}></Route>
    <Route path='/admin/register' element={(isLogged != '')?<Navigate to='/admin/dashboard' />:<Register />}></Route>
    <Route path='/admin/forgot-password' element={(isLogged != '')?<Navigate to='/admin/dashboard' />:<ForgotPassword />} ></Route>
    <Route path="/admin/dashboard" element={<AuthProtectedRoutes Component={Dashboard} />} />
    <Route path='*' element={<NotFound />}></Route>
   </Routes>
   </BrowserRouter>
  );
}

export default App;
