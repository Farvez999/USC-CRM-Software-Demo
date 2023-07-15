import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import { Link } from 'react-router-dom';
import PassChangeModel from '../../Modal/PassChangeModel';

const UserSetting = () => {

    const [sLead, setSLead] = useState()

    const { data: usersName = [], refetch } = useQuery({
        queryKey: ['usersName'],
        queryFn: async () => {
            const res = await fetch(`https://demo-usc-crm-server.vercel.app/users`);
            const data = await res.json();
            return data;
        }
    });

    console.log(usersName)

    const handleDelete = (leads) => {
        const confirmDelete = window.confirm('Are you sure you want to delete this item?');
        if (!confirmDelete) {
            return;
        }

        fetch(`https://demo-usc-crm-server.vercel.app/delete-user/${leads}`, {
            method: 'DELETE',
            headers: {
                authorization: `bearer ${localStorage.getItem('accessToken')}`
            }
        })
            .then(res => {
                return res.json()
            })
            .then(data => {
                toast.success(`User deleted successfully`)
                refetch()
            })
    }


    const handleChangePass = (singleLead) => {
        setSLead(singleLead)
    }

    return (
        <div>
            <div className='mt-4'>
                <p>New to USC CRM Software <Link className='text-secondary' to="/signup">Create new Account</Link></p>
            </div>
            <div>
                <h2 className='text-2xl font-bold my-4'>All Users Name !</h2>
                <div className="overflow-x-auto" style={{ height: '430px' }}>
                    <form>
                        <table className="table w-full">
                            <thead className='text-xs sticky top-0 bg-slate-300' style={{ width: "1200px" }}>
                                <tr>
                                    <th className='p-1 border-2'>#</th>
                                    <th className='p-1 border-2'>Date</th>
                                    <th className='p-1 border-2'>Name</th>
                                    <th className='p-1 border-2'>User Email</th>
                                    <th className='p-1 border-2'>Update Password</th>
                                    <th className='p-1 border-2'>Action</th>
                                </tr>
                            </thead>

                            <tbody className='w-fit'>
                                {
                                    usersName?.users?.length > 0 &&
                                    usersName?.users?.map((online, i) =>
                                        <tr key={online._id}>
                                            <th className='p-1 border-2'>{i + 1}</th>
                                            <td className='p-1 border-2'>{online?.createdAt?.slice(0, -14)}</td>
                                            <td className='p-1 border-2'>{online?.name}</td>
                                            <td className='p-1 border-2'>{online?.email}</td>
                                            <td className='p-1 border-2'>
                                                {/* <p className='btn btn-xs btn-denger' onClick={() => handleChangePass(online._id)} >Change Password</p> */}
                                                <label onClick={() => handleChangePass(online)} htmlFor="changePassModal" className="btn btn-xs btn-secondary">Change Password</label>
                                            </td>
                                            <td className='p-1 border-2'>
                                                <p className='btn btn-xs btn-denger' onClick={() => handleDelete(online._id)} >Delete</p>
                                            </td>
                                        </tr>
                                    )
                                }

                            </tbody>

                        </table>
                    </form>
                </div>
                {
                    sLead &&
                    <PassChangeModel
                        singleLead={sLead}
                        setSLead={setSLead}
                        refetch={refetch}
                    >
                    </PassChangeModel>
                }
            </div>
        </div>
    );
};

export default UserSetting;