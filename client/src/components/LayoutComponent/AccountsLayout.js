import React, { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthProvider';
import { Link } from 'react-router-dom';
import { RiBaseStationLine } from 'react-icons/ri';
import { HiStatusOffline } from 'react-icons/hi';

const AccountsLayout = () => {

    const { user, logout } = useContext(AuthContext);

    return (
        <div>
            {
                user?.role === "accounts" && <>

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
                                            <span className='text-xs'>Head Wise Report</span></Link>
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
                                            <span className='text-xs'>Voucher No Wise Report</span></Link>
                                    </li>
                                    <li><Link to={`/dashboard/expense/purpose`}>
                                        <img width="16" height="16" src="https://img.icons8.com/color-glass/48/profit-report.png" alt="profit-report" />
                                        <span className='text-xs'>Head Wise Report</span></Link></li>
                                </ul>
                            </details>
                        </li>

                        <li>
                            <details>
                                <summary>Cash Report</summary>
                                <ul>
                                    <li>
                                        <Link to={`/dashboard/cash/cash-report`}>
                                            <img width="16" height="16" src="https://img.icons8.com/fluency/48/pay-date.png" alt="pay-date" />
                                            <span className='text-xs'>Date Wise Report</span></Link>
                                    </li>
                                    {/* <li>
                                                        <Link to={`/dashboard/expense/boucher-report`}>
                                                            <img width="16" height="16" src="https://img.icons8.com/stickers/100/batch-assign.png" alt="batch-assign" />
                                                            <span className='text-xs'>Batch Wise Report</span></Link>
                                                    </li>
                                                    <li><Link to={`/dashboard/expense/purpose`}>
                                                        <img width="16" height="16" src="https://img.icons8.com/color-glass/48/profit-report.png" alt="profit-report" />
                                                        <span className='text-xs'>Purpose Wise Report</span></Link></li> */}
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



                </>
            }
        </div>
    );
};

export default AccountsLayout;