import React, { useEffect } from 'react';
import CustomizedDialogs from '../../Dialog/Dialog';
import useDelete from '../../Hooks/useDelete';
import useFindOrder from '../../Hooks/useFindOrder';
import SkeletonOrders from '../../shared/Skeleton/SkeletonOrders';
import SingleOrders from '../ManageAllOrders/SingleOrders';

const MyOrders = () => {
    const { handleDelete } = useDelete()
    const { FetchOrder, open, setOpen, existingOrders, user, isLoading, orderLoading } = useFindOrder()

    const handleClose = () => {
        setOpen(false, '');
    };

    useEffect(() => {
        FetchOrder()
    }, [user, isLoading])


    if (orderLoading && existingOrders.length < 1) {
        return (
            <>
                <SkeletonOrders />
            </>
        )
    }
    return (
        <>
            {
                (open[0] && existingOrders.length < 1) ? (
                    <CustomizedDialogs handleClose={handleClose} open={open[0]} heading={open[1]} description={open[2]} />
                ) : (existingOrders.length < 1 && <h1>No Order Placed Yet</h1>)
            }
            {
                existingOrders.map((order, id) => <SingleOrders handleDelete={handleDelete} order={order} admin={false} key={id} />)
            }
        </>
    );
};

export default MyOrders;