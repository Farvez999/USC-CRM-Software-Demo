import axios from 'axios';
import React from 'react';
import { toast } from 'react-hot-toast';

const PassChangeModel = ({ singleLead, setSLead, refetch }) => {
    console.log(singleLead, singleLead._id);
    const handleSubmit = e => {
        e.preventDefault();

        console.log(singleLead)

        const password = e.target.setPass.value;

        console.log(password);
        const user = {
            password
        };

        console.log(user)

        axios.patch(`https://demo-usc-crm-software.vercel.app/update-pass/${singleLead._id}`, user)
            .then((data) => {
                console.log(data);
                toast.success('Password Updates Success')
                setSLead(null)
                refetch()
            });

    }

    const handleCloseBtn = () => {
        setSLead(null)
    }

    return (
        <>
            <input type="checkbox" id="changePassModal" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box relative">
                    <label onClick={handleCloseBtn} htmlFor="changePassModal" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                    <h3 className="text-lg font-bold">Update Info</h3>
                    <form onSubmit={handleSubmit} className='grid grid-cols-1 gap-3 mt-10'>
                        <input type="text" disabled value={singleLead.name} className="input w-full input-bordered " />

                        <input name="setPass" type="text" placeholder="Set a New Pasword" className="input w-full input-bordered" />



                        <br />
                        <input className='btn btn-accent w-full' type='submit' value="Submit" />
                        {/* <button type='submit' className="btn btn-sm btn-primary mr-2">Update</button> */}
                    </form>
                </div>

            </div>
        </>
    );
};

export default PassChangeModel;