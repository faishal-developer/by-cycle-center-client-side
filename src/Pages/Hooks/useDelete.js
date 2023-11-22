import { useState } from "react";

const useDelete = () => {
    let [existingOrders, setExistingOrders] = useState([])
    const [open, setOpen] = useState([false, '', '']);

    const handleClose = () => {
        setOpen(false, '');
    };

    const handleDelete = (orderId) => {

        fetch('https://by-cycle-center-faishal-developer.vercel.app/orders', {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id: orderId })
        })
            .then(res => res.json())
            .then(data => {
                if (data.deletedCount === 1) {
                    let orders = existingOrders.filter(order => {
                        return order?._id !== orderId
                    })
                    setExistingOrders(orders)
                    setOpen([true, 'successfull', 'deleted successfully'])
                } else {
                    setOpen([true, "Error", 'error occured'])
                }
            })
            .catch(e => setOpen([true, 'Error', e.message]))
    }

    return {
        existingOrders,
        setExistingOrders,
        handleDelete,
        open,
        setOpen,
        handleClose
    }
};

export default useDelete;