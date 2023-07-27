import axios from 'axios';
import React from 'react';
import { toast } from 'react-hot-toast';

const EditModal = ({ singleLead, setSLead, refetchUpdateData }) => {
    // console.log(singleLead);

    const handleSubmit = e => {
        e.preventDefault();

        // console.log(singleLead)

        const firstFollow = e.target.firstFollow.value;
        const secondFollow = e.target.secondFollow.value;
        const thirdtFollow = e.target.thirdtFollow.value;
        const nextFollow = e.target.nextFollow.value;
        const remark = e.target.remark.value;

        const remarkTwo = e.target.remarkTwo.value;
        const admissionStatus = e.target.admissionStatus.value;

        // console.log(firstFollow, secondFollow, thirdtFollow, nextFollow, remark, remarkTwo, admissionStatus);
        const user = {
            firstFollow,
            secondFollow,
            thirdtFollow,
            nextFollow,
            remark,
            remarkTwo,
            admissionStatus

        };

        // console.log(user)

        axios.patch(`https://demo-usc-crm-software.vercel.app/update/${singleLead._id}`, user)
            .then((data) => {
                // console.log(data);
                toast.success('Lead Updates Success')
                setSLead(null)
                refetchUpdateData()
            });

    }

    const handleCloseBtn = () => {
        setSLead(null)
    }

    return (
        <>
            <input type="checkbox" id="editModal" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box relative">
                    <label onClick={handleCloseBtn} htmlFor="editModal" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                    <h3 className="text-lg font-bold">Update Info</h3>
                    <form onSubmit={handleSubmit} className='grid grid-cols-1 gap-3 mt-10'>
                        <input type="text" disabled value={singleLead.name} className="input w-full input-bordered " />

                        <input name="name" type="text" defaultValue={singleLead.phone} disabled placeholder="Your Name" className="input w-full input-bordered" />
                        <input name="email" type="email" defaultValue={singleLead.email} disabled placeholder="Email Address" className="input w-full input-bordered" />

                        <input name="firstFollow" type="date" defaultValue={singleLead.firstFollow} placeholder="Edit First Follow up" className="input w-full input-bordered" />
                        <input name="secondFollow" type="date" defaultValue={singleLead.secondFollow} placeholder="Edit First Follow up" className="input w-full input-bordered" />
                        <input name="thirdtFollow" type="date" defaultValue={singleLead.thirdtFollow} placeholder="Edit First Follow up" className="input w-full input-bordered" />
                        <input name="nextFollow" type="date" defaultValue={singleLead.nextFollow} placeholder="Edit First Follow up" className="input w-full input-bordered" />

                        <textarea name="remark" type="text" defaultValue={singleLead.remark} placeholder="Remark" className="textarea w-full textarea-bordered" />
                        <textarea name="remarkTwo" type="text" defaultValue={singleLead.remarkTwo} placeholder="Remark 2" className="textarea w-full textarea-bordered" />
                        <textarea name="admissionStatus" type="text" defaultValue={singleLead.admissionStatus} placeholder="Remark 3" className="textarea w-full textarea-bordered" />

                        <br />
                        <input className='btn btn-accent w-full' type='submit' value="Submit" />
                        {/* <button type='submit' className="btn btn-sm btn-primary mr-2">Update</button> */}
                    </form>
                </div>

            </div>
        </>
    );
};

export default EditModal;