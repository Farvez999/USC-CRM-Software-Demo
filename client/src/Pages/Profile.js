import React, { useContext } from 'react';
import { AuthContext } from '../contexts/AuthProvider';
import { RxDashboard } from 'react-icons/rx';
import { HiOutlineLogout } from 'react-icons/hi';
import { Link } from 'react-router-dom';

const Profile = () => {

    const { user, logout } = useContext(AuthContext)


    return (
        <div className='my-6 mx-auto w-96'>
            <div className="flex flex-col justify-center max-w-xs p-6 shadow-md rounded-xl sm:px-12 dark:bg-gray-900 dark:text-gray-100">
                <img src="https://source.unsplash.com/150x150/?portrait?3" alt="" className="w-32 h-32 mx-auto rounded-full dark:bg-gray-500 aspect-square" />
                <div className="space-y-4 text-center divide-y divide-gray-700">
                    <div className="my-2 space-y-1">
                        <h2 className="text-xl font-semibold sm:text-2xl">{user.name}</h2>
                        <p className="px-5 text-xs sm:text-base dark:text-gray-400">{user.role}</p>
                    </div>
                    <div className="flex justify-center pt-2 space-x-4 align-center">
                        <Link rel="noopener noreferrer" to="/dashboard" aria-label="GitHub" className="p-2 rounded-md dark:text-gray-100 hover:dark:text-violet-400">
                            <RxDashboard></RxDashboard>
                        </Link>

                        {/* <Link rel="noopener noreferrer" to="#" aria-label="Twitter" className="p-2 rounded-md dark:text-gray-100 hover:dark:text-violet-400">
                           <HiOutlineLogout></HiOutlineLogout>
                        </Link> */}
                        <div className='font-semibold mt-1'><button onClick={logout}><HiOutlineLogout></HiOutlineLogout></button></div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;