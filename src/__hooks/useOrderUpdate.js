import { useEffect, useState } from 'react';
import io from "socket.io-client";

const socket = io.connect("http://localhost:8000");

const useOrderUpdate = () => {
    const [orders, setOrders] = useState([]);

    const handleOrderUpdate = (updatedOrder) => {
        setOrders((prevOrders) => {
            const index = prevOrders.findIndex((order) => order.key === updatedOrder.orderId.toString());
            const updatedOrders = [...prevOrders];

            if (index !== -1) {
                updatedOrders[index].tags = updatedOrder.status;

                if (updatedOrder.status === 'Done') {
                    setTimeout(() => {
                        setOrders((prevOrders) => prevOrders.filter((order) => order.key !== updatedOrder.orderId.toString()));
                    }, 3000);
                }
            } else {
                const newOrder = {
                    key: updatedOrder.orderId.toString(),
                    tokenNumber: `Token ${updatedOrder.orderId}`,
                    name: updatedOrder.name,
                    tags: updatedOrder.status,
                };

                updatedOrders.push(newOrder);

                if (updatedOrder.status === 'Done') {
                    setTimeout(() => {
                        setOrders((prevOrders) => prevOrders.filter((order) => order.key !== updatedOrder.orderId.toString()));
                    }, 3000);
                }
            }

            return updatedOrders;
        });
    };

    useEffect(() => {
        socket.on('order_status', handleOrderUpdate);
        return () => {
            socket.off('order_status', handleOrderUpdate);
        };
    }, []);

    return orders;
};

export default useOrderUpdate;