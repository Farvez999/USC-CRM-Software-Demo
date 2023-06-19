import { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthProvider";

const Signup = () => {

    const { signup, user } = useContext(AuthContext)

    // const navigate = useNavigate();
    // useEffect(() => {
    //     console.log(user);
    //     if (user?._id) {
    //         navigate("/login");
    //     }
    // }, [user, navigate]);


    return (
        <div className='h-[500px] flex justify-center items-center'>
            <div className='w-96 p-7'>
                <h2 className='text-xl text-center'>Sign Up</h2>
                <form onSubmit={signup}>

                    <div className="form-control w-full max-w-xs">
                        <label className="label">
                            <span className="label-text">Name</span>
                        </label>
                        <input type="text"
                            name="name"
                            id="name"
                            className="input input-bordered w-full max-w-xs" />
                    </div>

                    <div className="form-control w-full max-w-xs">
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input type="email"
                            name="email"
                            id="email"
                            className="input input-bordered w-full max-w-xs" />

                    </div>

                    <div className="form-control w-full max-w-xs mt-4">
                        <select
                            name="role"
                            id="role" className="select select-bordered w-full max-w-xs">

                            <option>head</option>
                            <option>user</option>
                        </select>

                    </div>




                    <div className="form-control w-full max-w-xs">
                        <label className="label">
                            <span className="label-text">Password</span>
                        </label>
                        <input type="password"
                            name="password"
                            id="password"
                            className="input input-bordered w-full max-w-xs" />

                        <label className="label">
                            <span className="label-text">Forgot Password ?</span>
                        </label>
                    </div>


                    <input className='btn btn-accent w-full text-white' value="Sign Up" type="submit" />

                    <p>Already have an Account <Link className='text-secondary' to="/login">Please Login</Link></p>

                </form>
            </div>
        </div>
    );
};

export default Signup;