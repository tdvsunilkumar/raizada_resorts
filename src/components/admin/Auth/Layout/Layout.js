import React from "react";
import '../../assets/vendor/bootstrap-icons/bootstrap-icons.css';
import '../../assets/vendor/boxicons/css/boxicons.min.css';
import '../../assets/vendor/quill/quill.snow.css';
import '../../assets/vendor/quill/quill.bubble.css';
import '../../assets/vendor/remixicon/remixicon.css';
import '../../assets/vendor/simple-datatables/style.css';
import '../../assets/css/style.css';

import Logo from '../../assets/img/logo.png';

const Layout = ({children}) =>{
    return (
        <main>
    <div className="container">

      <section className="section register min-vh-100 d-flex flex-column align-items-center justify-content-center py-4">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-4 col-md-6 d-flex flex-column align-items-center justify-content-center">

              <div className="d-flex justify-content-center py-4">
                <a href="index.html" className="logo d-flex align-items-center w-auto">
                  <img src={Logo} alt="" />
                  <span className="d-none d-lg-block">{process.env.REACT_APP_NAME_ADMIN}</span>
                </a>
              </div>
              {children}
            </div>
          </div>
        </div>

      </section>

    </div>
  </main>
    );
};

export default Layout;