import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const AddCollection = () => {

    const navigate = useNavigate();

    const { data: expenseHeadName = [], refetch } = useQuery({
        queryKey: ['expenseHeadName'],
        queryFn: async () => {
            const res = await fetch(`https://demo-usc-crm-server.vercel.app/collection-head`);
            const data = await res.json();
            return data;
        }
    });

    const addAdmission = (e) => {
        e.preventDefault();
        const moneyReceipt = e.target.moneyReceipt.value;
        const purpose = e.target.purpose.value;
        const amount = e.target.amount.value;
        const receiveBy = e.target.receiveBy.value;
        const receiveFrom = e.target.receiveFrom.value;
        const discription = e.target.discription.value;

        const personalData = {
            moneyReceipt,
            purpose,
            amount,
            receiveBy,
            receiveFrom,
            discription
        }
        console.log(moneyReceipt, purpose, amount, receiveBy, receiveFrom, discription,);

        fetch(`https://demo-usc-crm-server.vercel.app/collection`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                authorization: localStorage.getItem('access_token')
            },
            body: JSON.stringify(personalData)
        })
            .then(res => res.json())
            .then(data => {
                if (data.message === "Collection Added Successfully") {
                    // toast.success(`Database Data ${data.message}`)
                    navigate('/dashboard/collection/collection')
                }
                toast.success(`Database Data ${data.message}`)
                console.log(data);
            })


    };


    return (
        <div className='mt-2 w-12/12 mx-auto'>

            <fieldset class="border border-solid border-gray-500 p-3 mx-10">
                <legend class="text-2xl">Add Collection</legend>

                <div div >
                    <div className='my-3 mx-2'>
                        <form onSubmit={addAdmission}>
                            <div>

                                <div className='flex flex-row gap-2'>
                                    <div className="form-control w-full">
                                        <label className="label">
                                            <span className="label-text">Money Receipt</span>
                                        </label>
                                        <input type="text"
                                            name="moneyReceipt"
                                            placeholder='Money Receipt Here...'
                                            className="input input-sm input-bordered w-full" />
                                    </div>

                                    <div className="form-control w-full">
                                        <label className="label">
                                            <span className="label-text">Purpose Name</span>
                                        </label>
                                        <select name="purpose" className="select select-bordered select-sm w-full">
                                            <option disabled selected>Purpose Name</option>
                                            {
                                                expenseHeadName?.users?.map((user) =>
                                                    <option
                                                        key={user._id}
                                                        value={user.purpose}>
                                                        {user.purpose}
                                                    </option>
                                                )
                                            }
                                        </select>
                                    </div>

                                    <div className="form-control w-full">
                                        <label className="label">
                                            <span className="label-text">Amount</span>
                                        </label>
                                        <input type="text"
                                            name="amount"
                                            placeholder='Enter Amount'
                                            className="input input-sm input-bordered w-full" />
                                    </div>

                                    <div className="form-control w-full">
                                        <label className="label">
                                            <span className="label-text">Receive By</span>
                                        </label>
                                        <input type="text"
                                            name="receiveBy"
                                            placeholder='Enter Receive By Name'
                                            className="input input-sm input-bordered w-full" />
                                    </div>

                                    <div className="form-control w-full">
                                        <label className="label">
                                            <span className="label-text">Receive From</span>
                                        </label>
                                        <input type="text"
                                            name="receiveFrom"
                                            placeholder='Enter Receive From Name'
                                            className="input input-sm input-bordered w-full" />
                                    </div>
                                </div>

                                <div className='flex flex-row gap-2'>
                                    <div className="form-control w-full">
                                        <label className="label">
                                            <span className="label-text">Discription</span>
                                        </label>
                                        <textarea name="discription" type="text" placeholder="Discription Here....." className="textarea textarea-bordered textarea-lg w-full" />
                                    </div>

                                </div>
                            </div>

                            <input className='btn btn-accent w-full text-white mt-3' value="Add New Collection" type="submit" />

                        </form>
                    </div>

                </div>
            </fieldset >
        </div >
    );
};

export default AddCollection;