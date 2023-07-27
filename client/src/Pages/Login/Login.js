import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthProvider";
import toast from 'react-hot-toast';

const Login = () => {

    const { login, user, loginError } = useContext(AuthContext);
    const navigate = useNavigate();
    useEffect(() => {
        // console.log(user);
        if (user?._id) {
            navigate("/dashboard");
        }
    }, [user, navigate]);


    useEffect(() => {
        toast.error(loginError)

    }, [loginError])

    return (
        <div className='h-[400px] flex justify-center items-center'>
            <div className='w-96 p-7'>
                <h2 className='text-xl text-center'>Login</h2>
                <form onSubmit={login}>

                    <div className="form-control w-full max-w-xs">
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            className="input input-bordered w-full max-w-xs"
                        />
                        {/* <input type="text" className="input input-bordered w-full max-w-xs" /> */}
                    </div>


                    <div className="form-control w-full max-w-xs">
                        <label className="label">
                            <span className="label-text">Password</span>
                        </label>
                        <input
                            type="password"
                            name="password"
                            id="password"
                            className="input input-bordered w-full max-w-xs"
                        />
                        {/* <input type="password" className="input input-bordered w-full max-w-xs" /> */}

                        <label className="label">
                            <span className="label-text">Forgot Password ?</span>
                        </label>


                    </div>


                    <input className='btn btn-accent w-full text-white' value="Login" type="submit" />
                    {/* <p>New to Doctors Portal <Link className='text-secondary' to="/signup">Create new Account</Link></p> */}
                    {/* <div className="divider">OR</div>
                    <button onClick={handleGoogleLogin} className='btn btn-outline w-full'>CONTINUE WITH GOOGLE</button> */}
                </form>
            </div>
        </div>
    );
};

export default Login;