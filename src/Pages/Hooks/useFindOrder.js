import { useContext, useState } from "react";
import { MyContext } from "./AuthProvider";
import useDelete from "./useDelete";

const useFindOrder = () => {
    const { setExistingOrders, existingOrders } = useDelete()
    const { user, isLoading } = useContext(MyContext)
    const [orderLoading, setOrderLoading] = useState(true)
    const [open, setOpen] = useState([false, '', '']);


    const FetchOrder = () => {
        fetch('https://by-cycle-center-faishal-developer.vercel.app/getOrders', {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify({ email: user.email })
        })
            .then(res => res.json())
            .then(data => {
                setOpen([false, '', ''])
                setExistingOrders(data)
                setOrderLoading(false)
            })
            .catch((e) => {
                setOpen([true, 'Error', e.messge || 'Failed to fetch'])
                setOrderLoading(false)
            })
    }

    return {
        FetchOrder,
        user,
        isLoading,
        orderLoading,
        existingOrders,
        open,
        setOpen
    }
};

export default useFindOrder;