import './App.css';
import Login from './components/admin/Auth/Login/Login';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import NotFound from './components/admin/NotFound/NotFound';
import Register from './components/admin/Auth/Register/Register';
import ForgotPassword from './components/admin/Auth/ForgotPassword/ForgotPassword';
import { ToastContainer } from 'react-toastify';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import FormExample from './components/admin/FormExample/FormExample';

function App() {
  return (
   <BrowserRouter>
   <ToastContainer
            closeButton
            position="bottom-left"
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
    <Route path='/admin' element={<Login />}></Route>
    <Route path='/admin/login' element={<Login />}></Route>
    <Route path='/admin/register' element={<Register />}></Route>
    <Route path='/admin/forgot-password' element={<ForgotPassword />}></Route>
    <Route path='/admin/test' element={<FormExample />}></Route>
    <Route path='*' element={<NotFound />}></Route>
   </Routes>
   </BrowserRouter>
  );
}

export default App;
