import React, { useContext } from 'react';
import { AuthContext } from '../contexts/AuthProvider';
import { Link, Outlet } from 'react-router-dom';
import { MdAdminPanelSettings } from 'react-icons/md';
import { CgCloseO } from 'react-icons/cg';
import { RiBaseStationLine } from 'react-icons/ri';
import { HiStatusOffline } from 'react-icons/hi';
import Navbar from '../Pages/Shared/Navbar';
import UserLayout from '../components/LayoutComponent/UserLayout';
import HeadLayout from '../components/LayoutComponent/HeadLayout';
import AdminLayout from '../components/LayoutComponent/AdminLayout';
import AccountsLayout from '../components/LayoutComponent/AccountsLayout';

const DashboardLayoutM = () => {
    const { user, logout } = useContext(AuthContext);
    // console.log(user?.role);
    return (
        <div>
            <Navbar></Navbar>
            <div className="drawer drawer-mobile">
                <input id="dashboard-drawer" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content">
                    <Outlet></Outlet>
                    {/* <label htmlFor="dashboard-drawer" className="btn btn-primary drawer-button lg:hidden">Open drawer</label> */}

                </div>

                <div className="drawer-side flex flex-col h-full p-3 w-52 min-w-fit text-white" style={{ backgroundColor: '#0c2556' }}>
                    <label htmlFor="dashboard-drawer" className="drawer-overlay"></label>
                    <div className="space-y-3">
                        {/* <div className="flex items-center justify-between">
                            <h2>Dashboard</h2>
                            <button className="p-2">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-5 h-5 fill-current dark:text-gray-100">
                                    <rect width="352" height="32" x="80" y="96"></rect>
                                    <rect width="352" height="32" x="80" y="240"></rect>
                                    <rect width="352" height="32" x="80" y="384"></rect>
                                </svg>
                            </button>
                        </div> */}
                        {/* <div className="relative">
                            <span className="absolute inset-y-0 left-0 flex items-center py-4">
                                <button type="submit" className="p-2 focus:outline-none focus:ring">
                                    <svg fill="currentColor" viewBox="0 0 512 512" className="w-5 h-5 dark:text-gray-400">
                                        <path d="M479.6,399.716l-81.084-81.084-62.368-25.767A175.014,175.014,0,0,0,368,192c0-97.047-78.953-176-176-176S16,94.953,16,192,94.953,368,192,368a175.034,175.034,0,0,0,101.619-32.377l25.7,62.2L400.4,478.911a56,56,0,1,0,79.2-79.195ZM48,192c0-79.4,64.6-144,144-144s144,64.6,144,144S271.4,336,192,336,48,271.4,48,192ZM456.971,456.284a24.028,24.028,0,0,1-33.942,0l-76.572-76.572-23.894-57.835L380.4,345.771l76.573,76.572A24.028,24.028,0,0,1,456.971,456.284Z"></path>
                                    </svg>
                                </button>
                            </span>
                            <input type="search" name="Search" placeholder="Search..." className="w-full py-2 pl-10 text-sm dark:border-transparent rounded-md focus:outline-none dark:bg-gray-800 dark:text-gray-100 focus:dark:bg-gray-900" />
                        </div> */}
                        <div className="flex items-center p-2 mt-1 space-x-4 justify-self-end">
                            <img src="https://universesoftcare.com/media/CustomerImage/Untitled-f1.jpg" alt="" className="w-12 h-12 rounded-lg dark:bg-gray-500" />
                            <div>
                                <h2 className="text-lg font-semibold">{user.name}</h2>
                                <span className="flex items-center space-x-1">
                                    <a rel="noopener noreferrer" href="#" className="text-xs hover:underline dark:text-gray-400">View profile</a>
                                </span>
                            </div>
                        </div>
                        <div className="flex-1">
                            <ul className="pt-2 pb-4 space-y-1 text-sm">

                                <UserLayout></UserLayout>

                                <HeadLayout></HeadLayout>

                                <AdminLayout></AdminLayout>

                                <AccountsLayout></AccountsLayout>

                            </ul>
                        </div>
                    </div>

                </div >


            </div >
        </div >
    );
};

export default DashboardLayoutM;