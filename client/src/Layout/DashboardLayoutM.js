import React, { useContext } from 'react';
import { AuthContext } from '../contexts/AuthProvider';
import { Link, Outlet } from 'react-router-dom';
import { MdAdminPanelSettings } from 'react-icons/md';
import { CgCloseO } from 'react-icons/cg';
import { RiBaseStationLine } from 'react-icons/ri';
import { HiStatusOffline } from 'react-icons/hi';
import Navbar from '../Pages/Shared/Navbar';

const DashboardLayoutM = () => {
    const { user, logout } = useContext(AuthContext);
    console.log(user?.role);
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
                                {

                                    user?.role === "user" && <>
                                        {/* <li><Link to='/dashboard/my-lead'>My Lead</Link></li>
                                        <li><Link to='/dashboard/my-admission'>My Admission</Link></li>
                                        <li><Link to='/dashboard/my-close'>My Close</Link></li>
                                        <li><Link to='/dashboard/online-student'>My Online</Link></li>
                                        <li><Link to='/dashboard/offline-student'>My Offline</Link></li>
                                        <li><Link to='/dashboard/seminar-interested'>Seminar Inter</Link></li>
                                        <li><Link to='/dashboard/seminar-attend'>Seminar Attend</Link></li>
                                        <li><Link to='/dashboard/no-receive'>No Receive</Link></li>
                                        <li><Link to='/dashboard/today-followup'>Today Follow</Link></li>
                                        <li><Link to='/dashboard/user-report'>Report</Link></li>
                                        <li><Link to='/dashboard/payment-details'>Payment</Link></li> */}
                                        <ul className="pt-2 pb-4 space-y-1 text-sm">
                                            <li className="rounded-sm">
                                                <Link rel="noopener noreferrer" to={`/dashboard`} className="flex items-center p-2 space-x-3 rounded-md">
                                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-5 h-5 fill-current dark:text-gray-400">
                                                        <path d="M469.666,216.45,271.078,33.749a34,34,0,0,0-47.062.98L41.373,217.373,32,226.745V496H208V328h96V496H480V225.958ZM248.038,56.771c.282,0,.108.061-.013.18C247.9,56.832,247.756,56.771,248.038,56.771ZM448,464H336V328a32,32,0,0,0-32-32H208a32,32,0,0,0-32,32V464H64V240L248.038,57.356c.013-.012.014-.023.024-.035L448,240Z"></path>
                                                    </svg>
                                                    <span>Dashboard</span>
                                                </Link>
                                            </li>
                                            <li className="rounded-sm">
                                                <Link rel="noopener noreferrer" to='/dashboard/my-lead' className="flex items-center p-2 space-x-3 rounded-md">
                                                    <img width="24" height="24" src="https://img.icons8.com/external-flaticons-lineal-color-flat-icons/64/external-lead-social-media-agency-flaticons-lineal-color-flat-icons-3.png" alt="external-lead-social-media-agency-flaticons-lineal-color-flat-icons-3" />
                                                    <span>My Lead</span>
                                                </Link>
                                            </li>
                                            <li className="rounded-sm">
                                                <Link rel="noopener noreferrer" to='/dashboard/my-admission' className="flex items-center p-2 space-x-3 rounded-md">
                                                    <img width="24" height="24" src="https://img.icons8.com/external-flaticons-lineal-color-flat-icons/64/external-student-university-flaticons-lineal-color-flat-icons-3.png" alt="external-student-university-flaticons-lineal-color-flat-icons-3" />
                                                    <span>My Admission</span>
                                                </Link>
                                            </li>
                                            <li className="rounded-sm">
                                                <Link rel="noopener noreferrer" to='/dashboard/my-close' className="flex items-center p-2 space-x-3 rounded-md">
                                                    <img width="24" height="24" src="https://img.icons8.com/external-fauzidea-outline-color-fauzidea/64/000000/external-student-back-to-school-fauzidea-outline-color-fauzidea.png" alt="external-student-back-to-school-fauzidea-outline-color-fauzidea" />
                                                    <span>My Close</span>
                                                </Link>
                                            </li>
                                            <li className="rounded-sm dark:bg-gray-800 dark:text-gray-50">
                                                <Link rel="noopener noreferrer" to='/dashboard/online-student' className="flex items-center p-2 space-x-3 rounded-md">
                                                    <RiBaseStationLine className='h-6 w-6'></RiBaseStationLine>
                                                    <span>My Online</span>
                                                </Link>
                                            </li>
                                            <li className="rounded-sm dark:bg-gray-800 dark:text-gray-50">
                                                <Link rel="noopener noreferrer" to='/dashboard/offline-student' className="flex items-center p-2 space-x-3 rounded-md">
                                                    <HiStatusOffline className='h-6 w-6'></HiStatusOffline>
                                                    <span>My Offline</span>
                                                </Link>
                                            </li>
                                            <li className="rounded-sm dark:bg-gray-800 dark:text-gray-50">
                                                <Link rel="noopener noreferrer" to='/dashboard/seminar-interested' className="flex items-center p-2 space-x-3 rounded-md">
                                                    <img width="24" height="24" src="https://img.icons8.com/external-flaticons-lineal-color-flat-icons/64/external-seminar-activism-flaticons-lineal-color-flat-icons-3.png" alt="external-seminar-activism-flaticons-lineal-color-flat-icons-3" />
                                                    <span>Seminar Inter</span>
                                                </Link>
                                            </li>
                                            <li className="rounded-sm dark:bg-gray-800 dark:text-gray-50">
                                                <Link rel="noopener noreferrer" to='/dashboard/seminar-attend' className="flex items-center p-2 space-x-3 rounded-md">
                                                    <img width="24" height="24" src="https://img.icons8.com/external-goofy-color-kerismaker/96/external-Seminar-communication-goofy-color-kerismaker.png" alt="external-Seminar-communication-goofy-color-kerismaker" />
                                                    <span>Seminar Attend</span>
                                                </Link>
                                            </li>
                                            <li className="rounded-sm dark:bg-gray-800 dark:text-gray-50">
                                                <Link rel="noopener noreferrer" to='/dashboard/no-receive' className="flex items-center p-2 space-x-3 rounded-md">
                                                    <img width="24" height="24" src="https://img.icons8.com/arcade/64/phone.png" alt="phone" />
                                                    <span>No Receive</span>
                                                </Link>
                                            </li>
                                            <li className="rounded-sm dark:bg-gray-800 dark:text-gray-50">
                                                <Link rel="noopener noreferrer" to='/dashboard/today-followup' className="flex items-center p-2 space-x-3 rounded-md">
                                                    <img width="24" height="24" src="https://img.icons8.com/bubbles/50/today.png" alt="today" />
                                                    <span>Today Follow</span>
                                                </Link>
                                            </li>

                                        </ul>

                                        <hr></hr>

                                        <ul className="pt-4 pb-2 space-y-1 text-sm">
                                            <li className="rounded-sm dark:bg-gray-800 dark:text-gray-50">
                                                <Link rel="noopener noreferrer" to='/dashboard/payment-details' className="flex items-center p-2 space-x-3 rounded-md">
                                                    <img width="24" height="24" src="https://img.icons8.com/bubbles/50/card-in-use.png" alt="card-in-use" />
                                                    <span>Payment</span>
                                                </Link>
                                            </li>
                                            <li className="rounded-sm dark:bg-gray-800 dark:text-gray-50">
                                                <Link rel="noopener noreferrer" to='/dashboard/user-report' className="flex items-center p-2 space-x-3 rounded-md">
                                                    <img width="16" height="16" src="https://img.icons8.com/color/48/pay-date.png" alt="pay-date" />
                                                    <span>Report</span>
                                                </Link>
                                            </li>

                                            <li className="rounded-sm">
                                                <Link rel="noopener noreferrer" to="#" className="flex items-center p-2 space-x-3 rounded-md">
                                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-5 h-5 fill-current dark:text-gray-400">
                                                        <path d="M440,424V88H352V13.005L88,58.522V424H16v32h86.9L352,490.358V120h56V456h88V424ZM320,453.642,120,426.056V85.478L320,51Z"></path>
                                                        <rect width="32" height="64" x="256" y="232"></rect>
                                                    </svg>
                                                    <span onClick={logout}>Logout</span>

                                                </Link>
                                            </li>
                                        </ul>

                                    </>
                                }


                                {
                                    user?.role === "head" && <>
                                        <li><Link to="/dashboard/head-leads">Head Leads</Link></li>
                                        <li><Link to="/dashboard/head-admission">Admission</Link></li>
                                        <li><Link to="/dashboard/head-close">Close</Link></li>
                                        <li><Link to="/dashboard/head-online">Online Inter</Link></li>
                                        <li><Link to="/dashboard/head-offline">Offline Inter</Link></li>
                                        <li><Link to='/dashboard/head-interesteds'>Total SI</Link></li>
                                        <li><Link to='/dashboard/head-attends'>Total SA</Link></li>
                                        <li><Link to='/dashboard/head-no-receive'>No Receive</Link></li>
                                        <li><Link to='/dashboard/head-today-followUps'>Today FUp</Link></li>
                                        <li><Link to={`/dashboard/head-pay-details`}>Payment</Link></li>
                                    </>
                                }

                                {
                                    user?.role === "admin" && <>

                                        <ul className="pt-2 pb-4 space-y-1 text-sm">
                                            <li className="rounded-sm">
                                                <Link rel="noopener noreferrer" to={`/dashboard`} className="flex items-center p-2 space-x-3 rounded-md">
                                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-5 h-5 fill-current dark:text-gray-400">
                                                        <path d="M469.666,216.45,271.078,33.749a34,34,0,0,0-47.062.98L41.373,217.373,32,226.745V496H208V328h96V496H480V225.958ZM248.038,56.771c.282,0,.108.061-.013.18C247.9,56.832,247.756,56.771,248.038,56.771ZM448,464H336V328a32,32,0,0,0-32-32H208a32,32,0,0,0-32,32V464H64V240L248.038,57.356c.013-.012.014-.023.024-.035L448,240Z"></path>
                                                    </svg>
                                                    <span>Dashboard</span>
                                                </Link>
                                            </li>
                                            <li className="rounded-sm">
                                                <Link rel="noopener noreferrer" to={`/dashboard/lead-upload`} className="flex items-center p-2 space-x-3 rounded-md">
                                                    <img width="24" height="24" src="https://img.icons8.com/external-flatart-icons-flat-flatarticons/64/external-upload-network-and-cloud-computing-flatart-icons-flat-flatarticons.png" alt="external-upload-network-and-cloud-computing-flatart-icons-flat-flatarticons" />
                                                    <span>Upload Lead</span>
                                                </Link>
                                            </li>
                                            <li className="rounded-sm">
                                                <Link rel="noopener noreferrer" to={`/dashboard/total-leads`} className="flex items-center p-2 space-x-3 rounded-md">
                                                    <img width="24" height="24" src="https://img.icons8.com/external-flaticons-lineal-color-flat-icons/64/external-lead-social-media-agency-flaticons-lineal-color-flat-icons-3.png" alt="external-lead-social-media-agency-flaticons-lineal-color-flat-icons-3" />
                                                    <span>Total Lead</span>
                                                </Link>
                                            </li>
                                            <li className="rounded-sm">
                                                <Link rel="noopener noreferrer" to={`/dashboard/total-admission`} className="flex items-center p-2 space-x-3 rounded-md">
                                                    <img width="24" height="64" src="https://img.icons8.com/external-flaticons-lineal-color-flat-icons/64/external-student-university-flaticons-lineal-color-flat-icons-3.png" alt="external-student-university-flaticons-lineal-color-flat-icons-3" />
                                                    <span>Total Admission</span>
                                                </Link>
                                            </li>
                                            <li className="rounded-sm">
                                                <Link rel="noopener noreferrer" to={`/dashboard/total-close`} className="flex items-center p-2 space-x-3 rounded-md">
                                                    <img width="24" height="24" src="https://img.icons8.com/external-fauzidea-outline-color-fauzidea/64/000000/external-student-back-to-school-fauzidea-outline-color-fauzidea.png" alt="external-student-back-to-school-fauzidea-outline-color-fauzidea" />
                                                    <span>Total Close</span>
                                                </Link>
                                            </li>
                                            <li className="rounded-sm dark:bg-gray-800 dark:text-gray-50">
                                                <Link rel="noopener noreferrer" to={`/dashboard/online-students`} className="flex items-center p-2 space-x-3 rounded-md">
                                                    <RiBaseStationLine className='h-6 w-6'></RiBaseStationLine>
                                                    <span>Total Online</span>
                                                </Link>
                                            </li>
                                            <li className="rounded-sm dark:bg-gray-800 dark:text-gray-50">
                                                <Link rel="noopener noreferrer" to={`/dashboard/offline-students`} className="flex items-center p-2 space-x-3 rounded-md">
                                                    <HiStatusOffline className='h-6 w-6'></HiStatusOffline>
                                                    <span>Total Offline</span>
                                                </Link>
                                            </li>
                                            <li className="rounded-sm dark:bg-gray-800 dark:text-gray-50">
                                                <Link rel="noopener noreferrer" to={`/dashboard/seminar-interesteds`} className="flex items-center p-2 space-x-3 rounded-md">
                                                    <img width="24" height="24" src="https://img.icons8.com/external-flaticons-lineal-color-flat-icons/64/external-seminar-activism-flaticons-lineal-color-flat-icons-3.png" alt="external-seminar-activism-flaticons-lineal-color-flat-icons-3" />
                                                    <span>Total SI</span>
                                                </Link>
                                            </li>
                                            <li className="rounded-sm dark:bg-gray-800 dark:text-gray-50">
                                                <Link rel="noopener noreferrer" to={`/dashboard/seminar-attends`} className="flex items-center p-2 space-x-3 rounded-md">
                                                    <img width="24" height="24" src="https://img.icons8.com/external-goofy-color-kerismaker/96/external-Seminar-communication-goofy-color-kerismaker.png" alt="external-Seminar-communication-goofy-color-kerismaker" />
                                                    <span>Total SA</span>
                                                </Link>
                                            </li>
                                            <li className="rounded-sm dark:bg-gray-800 dark:text-gray-50">
                                                <Link rel="noopener noreferrer" to={`/dashboard/total-no-receive`} className="flex items-center p-2 space-x-3 rounded-md">
                                                    <img width="24" height="24" src="https://img.icons8.com/arcade/64/phone.png" alt="phone" />
                                                    <span>No Receive</span>
                                                </Link>
                                            </li>
                                            <li className="rounded-sm dark:bg-gray-800 dark:text-gray-50">
                                                <Link rel="noopener noreferrer" to={`/dashboard/today-followUps`} className="flex items-center p-2 space-x-3 rounded-md">
                                                    <img width="24" height="24" src="https://img.icons8.com/bubbles/50/today.png" alt="today" />
                                                    <span>Today FUp</span>
                                                </Link>
                                            </li>

                                        </ul>

                                        <hr></hr>

                                        <ul className="pt-4 pb-2 space-y-1 text-sm">
                                            <li className="rounded-sm dark:bg-gray-800 dark:text-gray-50">
                                                <Link rel="noopener noreferrer" to={`/dashboard/admin-pay-details`} className="flex items-center p-2 space-x-3 rounded-md">
                                                    <img width="24" height="24" src="https://img.icons8.com/bubbles/50/card-in-use.png" alt="card-in-use" />
                                                    <span>Payment</span>
                                                </Link>
                                            </li>
                                        </ul>
                                        <hr></hr>

                                        <ul className="menu text-left">
                                            <li>
                                                <details>
                                                    <summary>Course Report</summary>
                                                    <ul>
                                                        <li>
                                                            <Link to={`/dashboard/report/collection`}>
                                                                <img width="16" height="16" src="https://img.icons8.com/fluency/48/pay-date.png" alt="pay-date" />
                                                                <span className='text-xs'>Date Wise Collection</span></Link>
                                                        </li>
                                                        <li>
                                                            <Link to={`/dashboard/admin-pay-report`}>
                                                                <img width="16" height="16" src="https://img.icons8.com/stickers/100/batch-assign.png" alt="batch-assign" />
                                                                <span className='text-xs'>Batch Wise Report</span></Link>
                                                        </li>
                                                        <li><Link to={`/dashboard/report/payGetway`}>
                                                            <img width="16" height="16" src="https://img.icons8.com/color-glass/48/profit-report.png" alt="profit-report" />
                                                            <span className='text-xs'>PayGetway Report</span></Link></li>
                                                    </ul>
                                                </details>
                                            </li>
                                            <li>
                                                <details>
                                                    <summary>Collection</summary>
                                                    <ul>
                                                        <li>
                                                            <Link to={`/dashboard/collection/head`}>
                                                                <img width="16" height="16" src="https://img.icons8.com/fluency/48/pay-date.png" alt="pay-date" />
                                                                <span className='text-xs'>Collection Head</span></Link>
                                                        </li>
                                                        <li>
                                                            <Link to={`/dashboard/collection/add`}>
                                                                <img width="16" height="16" src="https://img.icons8.com/arcade/64/add-property.png" alt="add-property" />
                                                                <span className='text-xs'>Add Collection</span></Link>
                                                        </li>
                                                        <li>
                                                            <Link to={`/dashboard/collection/collection`}>
                                                                <img width="16" height="16" src="https://img.icons8.com/color/48/topup-payment.png" alt="topup-payment" />
                                                                <span className='text-xs'>Collection</span></Link>
                                                        </li>
                                                    </ul>
                                                </details>
                                            </li>
                                            <li>
                                                <details>
                                                    <summary>Collection Report</summary>
                                                    <ul>
                                                        <li>
                                                            <Link to={`/dashboard/collection/date-report`}>
                                                                <img width="16" height="16" src="https://img.icons8.com/color/48/pay-date.png" alt="pay-date" />
                                                                <span className='text-xs'>Date Wise Report</span></Link>
                                                        </li>
                                                        <li>
                                                            <Link to={`/dashboard/collection/money-receipt`}>
                                                                <img width="16" height="16" src="https://img.icons8.com/officel/16/mobile-payment.png" alt="mobile-payment" />
                                                                <span className='text-xs'>Money Receipt</span></Link>
                                                        </li>
                                                        <li>
                                                            <Link to={`/dashboard/collection/purpose`}>
                                                                <img width="16" height="16" src="https://img.icons8.com/arcade/64/health-graph.png" alt="health-graph" />
                                                                <span className='text-xs'>Purpose Wise Report</span></Link>
                                                        </li>
                                                        <li>
                                                            <Link to={`/dashboard/report/payGetway`}>
                                                                <img width="16" height="16" src="https://img.icons8.com/color-glass/48/download-graph-report.png" alt="download-graph-report" />
                                                                <span className='text-xs'>PayGetway Report</span></Link>
                                                        </li>
                                                    </ul>
                                                </details>
                                            </li>
                                            <li>
                                                <details>
                                                    <summary>Expense</summary>
                                                    <ul>
                                                        <li>
                                                            <Link to={`/dashboard/expense/head`}>
                                                                <img width="16" height="16" src="https://img.icons8.com/fluency/48/pay-date.png" alt="pay-date" />
                                                                <span className='text-xs'>Expense Head</span></Link>
                                                        </li>
                                                        <li>
                                                            <Link to={`/dashboard/expense/add`}>
                                                                <img width="16" height="16" src="https://img.icons8.com/stickers/100/batch-assign.png" alt="batch-assign" />
                                                                <span className='text-xs'>Add Expense</span></Link>
                                                        </li>
                                                        <li><Link to={`/dashboard/expense/expense`}>
                                                            <img width="16" height="16" src="https://img.icons8.com/color-glass/48/profit-report.png" alt="profit-report" />
                                                            <span className='text-xs'>Expense</span></Link></li>
                                                    </ul>
                                                </details>
                                            </li>
                                            <li>
                                                <details>
                                                    <summary>Expense Report</summary>
                                                    <ul>
                                                        <li>
                                                            <Link to={`/dashboard/expense/date-report`}>
                                                                <img width="16" height="16" src="https://img.icons8.com/fluency/48/pay-date.png" alt="pay-date" />
                                                                <span className='text-xs'>Date Wise Report</span></Link>
                                                        </li>
                                                        <li>
                                                            <Link to={`/dashboard/expense/boucher-report`}>
                                                                <img width="16" height="16" src="https://img.icons8.com/stickers/100/batch-assign.png" alt="batch-assign" />
                                                                <span className='text-xs'>Batch Wise Report</span></Link>
                                                        </li>
                                                        <li><Link to={`/dashboard/expense/purpose`}>
                                                            <img width="16" height="16" src="https://img.icons8.com/color-glass/48/profit-report.png" alt="profit-report" />
                                                            <span className='text-xs'>Purpose Wise Report</span></Link></li>
                                                    </ul>
                                                </details>
                                            </li>
                                            <li>
                                                <details>
                                                    <summary>Loan</summary>
                                                    <ul>
                                                        <li>
                                                            <Link to={`/dashboard/loan/head`}>
                                                                <img width="16" height="16" src="https://img.icons8.com/fluency/48/pay-date.png" alt="pay-date" />
                                                                <span className='text-xs'>Loan Head</span></Link>
                                                        </li>
                                                        <li>
                                                            <Link to={`/dashboard/loan/provide`}>
                                                                <img width="16" height="16" src="https://img.icons8.com/color/48/pay-date.png" alt="pay-date" />
                                                                <span className='text-xs'>Loan Payable</span></Link>
                                                        </li>
                                                        <li>
                                                            <Link to={`/dashboard/loan/all-provide`}>
                                                                <img width="16" height="16" src="https://img.icons8.com/officel/16/mobile-payment.png" alt="mobile-payment" />
                                                                <span className='text-xs'>All Payable</span></Link>
                                                        </li>
                                                        <li>
                                                            <Link to={`/dashboard/loan/receive`}>
                                                                <img width="16" height="16" src="https://img.icons8.com/arcade/64/health-graph.png" alt="health-graph" />
                                                                <span className='text-xs'>Loan Receiveable</span></Link>
                                                        </li>
                                                        <li>
                                                            <Link to={`/dashboard/loan/all-receive`}>
                                                                <img width="16" height="16" src="https://img.icons8.com/color-glass/48/download-graph-report.png" alt="download-graph-report" />
                                                                <span className='text-xs'>All Receiveable</span></Link>
                                                        </li>
                                                    </ul>
                                                </details>
                                            </li>
                                        </ul>

                                        <hr></hr>

                                        <ul className="pt-4 pb-2 space-y-1 text-sm menu text-left">
                                            <li>
                                                <details>
                                                    <summary>Settings</summary>
                                                    <ul>
                                                        <li>
                                                            <Link to={`/dashboard/settings/course`}>
                                                                <img width="16" height="16" src="https://img.icons8.com/color/48/pay-date.png" alt="pay-date" />
                                                                <span className='text-xs'>Course Name</span></Link>
                                                        </li>
                                                        <li>
                                                            <Link to={`/dashboard/settings/batch`}>
                                                                <img width="16" height="16" src="https://img.icons8.com/officel/16/mobile-payment.png" alt="mobile-payment" />
                                                                <span className='text-xs'>Batch Name</span></Link>
                                                        </li>
                                                        <li>
                                                            <Link to={`/dashboard/settings/head`}>
                                                                <img width="16" height="16" src="https://img.icons8.com/arcade/64/health-graph.png" alt="health-graph" />
                                                                <span className='text-xs'>Head Name</span></Link>
                                                        </li>
                                                        <li>
                                                            <Link to={`/dashboard/setting/user`}>
                                                                <img width="16" height="16" src="https://img.icons8.com/color-glass/48/download-graph-report.png" alt="download-graph-report" />
                                                                <span className='text-xs'>User Name</span></Link>
                                                        </li>
                                                        <li>
                                                            <Link to={`/dashboard/setting/payment-type`}>
                                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-4 h-4 fill-current dark:text-gray-400">
                                                                    <path d="M245.151,168a88,88,0,1,0,88,88A88.1,88.1,0,0,0,245.151,168Zm0,144a56,56,0,1,1,56-56A56.063,56.063,0,0,1,245.151,312Z"></path>
                                                                    <path d="M464.7,322.319l-31.77-26.153a193.081,193.081,0,0,0,0-80.332l31.77-26.153a19.941,19.941,0,0,0,4.606-25.439l-32.612-56.483a19.936,19.936,0,0,0-24.337-8.73l-38.561,14.447a192.038,192.038,0,0,0-69.54-40.192L297.49,32.713A19.936,19.936,0,0,0,277.762,16H212.54a19.937,19.937,0,0,0-19.728,16.712L186.05,73.284a192.03,192.03,0,0,0-69.54,40.192L77.945,99.027a19.937,19.937,0,0,0-24.334,8.731L21,164.245a19.94,19.94,0,0,0,4.61,25.438l31.767,26.151a193.081,193.081,0,0,0,0,80.332l-31.77,26.153A19.942,19.942,0,0,0,21,347.758l32.612,56.483a19.937,19.937,0,0,0,24.337,8.73l38.562-14.447a192.03,192.03,0,0,0,69.54,40.192l6.762,40.571A19.937,19.937,0,0,0,212.54,496h65.222a19.936,19.936,0,0,0,19.728-16.712l6.763-40.572a192.038,192.038,0,0,0,69.54-40.192l38.564,14.449a19.938,19.938,0,0,0,24.334-8.731L469.3,347.755A19.939,19.939,0,0,0,464.7,322.319Zm-50.636,57.12-48.109-18.024-7.285,7.334a159.955,159.955,0,0,1-72.625,41.973l-10,2.636L267.6,464h-44.89l-8.442-50.642-10-2.636a159.955,159.955,0,0,1-72.625-41.973l-7.285-7.334L76.241,379.439,53.8,340.562l39.629-32.624-2.7-9.973a160.9,160.9,0,0,1,0-83.93l2.7-9.972L53.8,171.439l22.446-38.878,48.109,18.024,7.285-7.334a159.955,159.955,0,0,1,72.625-41.973l10-2.636L222.706,48H267.6l8.442,50.642,10,2.636a159.955,159.955,0,0,1,72.625,41.973l7.285,7.334,48.109-18.024,22.447,38.877-39.629,32.625,2.7,9.972a160.9,160.9,0,0,1,0,83.93l-2.7,9.973,39.629,32.623Z"></path>
                                                                </svg>
                                                                <span className='text-xs'>Pay Type Setting</span></Link>
                                                        </li>
                                                    </ul>
                                                </details>
                                            </li>

                                            <li className="rounded-sm">
                                                {/* <li className='font-semibold'><button onClick={logout}>Sign Out</button></li> */}
                                                <Link rel="noopener noreferrer" to="#" className="flex items-center p-2 space-x-3 rounded-md">
                                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-5 h-5 fill-current dark:text-gray-400">
                                                        <path d="M440,424V88H352V13.005L88,58.522V424H16v32h86.9L352,490.358V120h56V456h88V424ZM320,453.642,120,426.056V85.478L320,51Z"></path>
                                                        <rect width="32" height="64" x="256" y="232"></rect>
                                                    </svg>
                                                    <span onClick={logout}>Logout</span>

                                                </Link>
                                            </li>
                                        </ul>

                                    </>
                                }

                            </ul>
                        </div>
                    </div>

                </div >


            </div >
        </div >
    );
};

export default DashboardLayoutM;