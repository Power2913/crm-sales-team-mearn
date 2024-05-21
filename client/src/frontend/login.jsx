import React from 'react'
import "bootstrap/dist/css/bootstrap.min.css";
import '../css/login.css'
const login = () => {
  return (
    <div className="wrapper">
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-4 login-bg">
                    <div className="login-overlay">
                        <div className="login-left">
                            {/* <!-- Additional content if needed --> */}
                        </div>
                    </div>
                </div>
                <div className="col-md-8 login-form">
                    <form action="" className="av-valid">
                        <div className="login-form-body">
                            <div className="form-group">
                                <label htmlFor="username">Username</label>
                                <input type="text" className="form-control" id="username" placeholder="Username" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="password">Password</label>
                                <input type="password" name="password" className="form-control" id="password" placeholder="Password" />
                            </div>
                            <div className="form-group">
                                <button type="submit" className='btn btn-primary btn btn-primary'>Login</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
  )
}

export default login