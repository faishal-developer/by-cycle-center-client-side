import React, { useEffect, useState } from 'react';
import CustomizedDialogs from '../../Dialog/Dialog';
import useDelete from '../../Hooks/useDelete';
import SkeletonOrders from '../../shared/Skeleton/SkeletonOrders';
import SingleOrders from './SingleOrders';

const ManageAllOrders = () => {
    const { existingOrders, setExistingOrders, open, setOpen, handleClose, handleDelete } = useDelete()
    const [modified, setModified] = useState(false)
    const [orderLoading, setOrderLoading] = useState(true)

    useEffect(() => {
        console.log('manage', 'calling');
        fetch('https://by-cycle-center-faishal-developer.vercel.app/orders')
            .then(res => res.json())
            .then(data => {
                setExistingOrders(data)
                setModified(false)
                setOrderLoading(false)
            })
            .catch(e => setOpen(e.message))
    }, [modified])

    const handleUpdateStatus = (id) => {

        fetch('https://by-cycle-center-faishal-developer.vercel.app/orders', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ status: 'shipted', id: id })
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount) {
                    setModified(true)
                }
            })
            .catch(e => setOpen(e.message))
    }
    if (orderLoading && existingOrders.length < 1) {
        return <SkeletonOrders />
    }
    return (
        <div>
            {
                existingOrders?.map((order, i) => <SingleOrders admin={true} handleDelete={handleDelete} handleUpdateStatus={handleUpdateStatus} order={order} key={i} />)
            }
            {open && <CustomizedDialogs handleClose={handleClose} open={open[0]} heading={open[1]} description={open[2]} />}

        </div>
    );
};

export default ManageAllOrders;