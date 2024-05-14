import '../Login/Login.css';

function Login() {
    return (
        <section className="bg-primary d-flex align-items-center justify-content-center vh-100">
            <div className="container">
                <div className="d-flex justify-content-center">
                    <div className="d-block col-md-4 col-12">
                        <div className="card rounded-0 border-0">
                            <div className="card-body">
                                <div className="d-flex justify-content-center">
                                    <img src="assets/brand-logo.png" height="30" alt="brand-logo" />
                                </div>

                                <p className="fs-4 fw-bold text-center">Welcome Back</p>

                                <div className="mb-3">
                                    <label className="form-label">Sign In</label>
                                    <input type="text" className="form-control rounded-0 bg-light-dark" placeholder="Email address" />
                                </div>

                                <div className="mb-3">
                                    <button type="submit" className="btn btn-warning w-100 rounded-0 fw-bold">Next</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Login;
