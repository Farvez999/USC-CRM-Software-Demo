import React, { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthProvider';
import { Link } from 'react-router-dom';
import { RiBaseStationLine } from 'react-icons/ri';
import { HiStatusOffline } from 'react-icons/hi';

const UserLayout = () => {

    const { user, logout } = useContext(AuthContext);

    return (
        <div>
            {
                user?.role === "user" && <>
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
        </div>
    );
};

export default UserLayout;