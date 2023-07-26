import React, { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthProvider';
import { Link } from 'react-router-dom';
import { RiBaseStationLine } from 'react-icons/ri';
import { HiStatusOffline } from 'react-icons/hi';

const HeadLayout = () => {

    const { user, logout } = useContext(AuthContext);

    return (
        <div>
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
        </div>
    );
};

export default HeadLayout;