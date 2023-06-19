import React, { useContext } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthProvider';
import Navbar from '../Pages/Shared/Navbar';

const DashBoardLayout = () => {
    const { user } = useContext(AuthContext);
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
                <div className="drawer-side shadow-lg">
                    <label htmlFor="dashboard-drawer" className="drawer-overlay"></label>
                    <ul className="menu p-4 w-44 text-base-content">


                        {

                            user?.role === "user" && <>
                                <li><Link to='/dashboard/my-lead'>My Lead</Link></li>
                                <li><Link to='/dashboard/my-admission'>My Admission</Link></li>
                                <li><Link to='/dashboard/my-close'>My Close</Link></li>
                                <li><Link to='/dashboard/online-student'>My Online</Link></li>
                                <li><Link to='/dashboard/offline-student'>My Offline</Link></li>
                                <li><Link to='/dashboard/seminar-interested'>Seminar Inter</Link></li>
                                <li><Link to='/dashboard/seminar-attend'>Seminar Attend</Link></li>
                                <li><Link to='/dashboard/no-receive'>No Receive</Link></li>
                                <li><Link to='/dashboard/today-followup'>Today Follow</Link></li>
                                <li><Link to='/dashboard/user-report'>Report</Link></li>
                                <li><Link to='/dashboard/payment-details'>Payment</Link></li>
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
                                {/* <li><Link to={`/dashboard/upload-lead`}>Upload Lead</Link></li> */}
                                <li><Link to={`/dashboard/lead-upload`}>Upload Lead</Link></li>
                                <li><Link to={`/dashboard/total-leads`}>Total Leads</Link></li>
                                <li><Link to={`/dashboard/total-admission`}>Total Admission</Link></li>
                                <li><Link to={`/dashboard/total-close`}>Total Close</Link></li>
                                <li><Link to={`/dashboard/online-students`}>Online Student</Link></li>
                                <li><Link to={`/dashboard/offline-students`}>Offline Student</Link></li>
                                <li><Link to={`/dashboard/seminar-interesteds`}>Total SI</Link></li>
                                <li><Link to={`/dashboard/seminar-attends`}>Total SA</Link></li>
                                <li><Link to={`/dashboard/total-no-receive`}>No Receive</Link></li>
                                <li><Link to={`/dashboard/today-followUps`}>Today FUp</Link></li>

                                <li><Link to={`/dashboard/admin-pay-details`}>Payment</Link></li>

                                {/* <li><Link to={`/dashboard/add-admissions`}>Add</Link></li> */}
                                <div className="dropdown dropdown-hover my-2">
                                    <label tabIndex={0} className="mr-4">Course Report</label>
                                    <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
                                        <li><Link to={`/dashboard/report/collection`}>Date Wise Collection</Link></li>
                                        <li><Link to={`/dashboard/admin-pay-report`}>Batch Wise Report</Link></li>
                                        <li><Link to={`/dashboard/report/payGetway`}>PayGetway Report</Link></li>
                                    </ul>
                                </div>

                                <div className="dropdown dropdown-hover my-2">
                                    <label tabIndex={0} className="mr-10">Collection</label>
                                    <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
                                        <li><Link to={`/dashboard/collection/add`}>Add Collection</Link></li>
                                        <li><Link to={`/dashboard/collection/collection`}>Collection</Link></li>
                                        {/* <li><Link to={`/dashboard/expense/head`}>Expense Head</Link></li> */}
                                    </ul>
                                </div>

                                <div className="dropdown dropdown-hover my-2">
                                    <label tabIndex={0} className="mr-6">Collection Re</label>
                                    <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
                                        <li><Link to={`/dashboard/collection/date-report`}>Date Wise Report</Link></li>
                                        {/* <li><Link to={`/dashboard/collection/money-receipt`}>Money Receipt Report</Link></li>
                                        <li><Link to={`/dashboard/collection/purpose`}>Purpose Wise Report</Link></li> */}
                                        {/* <li><Link to={`/dashboard/report/payGetway`}>PayGetway Report</Link></li> */}
                                    </ul>
                                </div>


                                <div className="dropdown dropdown-hover my-2">
                                    <label tabIndex={0} className="mr-14">Expense</label>
                                    <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
                                        <li><Link to={`/dashboard/expense/head`}>Expense Head</Link></li>
                                        <li><Link to={`/dashboard/expense/add`}>Add Expense</Link></li>
                                        <li><Link to={`/dashboard/expense/expense`}>Expense</Link></li>
                                    </ul>
                                </div>

                                <div className="dropdown dropdown-hover my-2">
                                    <label tabIndex={0} className="mr-8">Expense Re</label>
                                    <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
                                        <li><Link to={`/dashboard/expense/date-report`}>Date Wise Report</Link></li>
                                        <li><Link to={`/dashboard/expense/boucher-report`}>Batch Wise Report</Link></li>
                                        <li><Link to={`/dashboard/expense/purpose`}>Purpose Wise Report</Link></li>
                                    </ul>
                                </div>

                                <div className="dropdown dropdown-hover my-2">
                                    <label tabIndex={0} className="mr-12">Loan P/R</label>
                                    <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
                                        <li><Link to={`/dashboard/loan/provide`}>Provide Loan</Link></li>
                                        <li><Link to={`/dashboard/loan/all-provide`}>All Provide</Link></li>
                                        <li><Link to={`/dashboard/loan/receive`}>Receive Loan</Link></li>
                                        <li><Link to={`/dashboard/loan/all-receive`}>All Receive</Link></li>
                                        {/* <li><Link to={`/dashboard/settings/head`}>Head Name</Link></li>
                                        <li><Link to={`/dashboard/setting/user`}>User Name</Link></li>
                                        <li><Link to={`/dashboard/setting/other`}>Other Setting</Link></li> */}
                                    </ul>
                                </div>

                                <div className="dropdown dropdown-hover my-2">
                                    <label tabIndex={0} className="mr-14">Settings</label>
                                    <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
                                        <li><Link to={`/dashboard/settings/course`}>Course Name</Link></li>
                                        <li><Link to={`/dashboard/settings/batch`}>Batch Name</Link></li>
                                        <li><Link to={`/dashboard/settings/head`}>Head Name</Link></li>
                                        <li><Link to={`/dashboard/setting/user`}>User Name</Link></li>
                                        <li><Link to={`/dashboard/setting/other`}>Other Setting</Link></li>
                                    </ul>
                                </div>


                            </>
                        }
                    </ul>

                </div>
            </div>
        </div>
    );
};

export default DashBoardLayout;