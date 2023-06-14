import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Form, Select, Checkbox, Button, Input } from 'antd';
import nominos from "../../assets/CompanyLogo1.png"
import "./newOrder.css"
const { Option } = Select;

const pizzaTypes = ['Margherita', 'Pepperoni', 'Vegetarian', 'Hawaiian'];
const toppings = ['Cheese', 'Mushrooms', 'Onions', 'Olives'];

const NewOrderPage = () => {
    const [order, setOrder] = useState({ pizza: { type: '', toppings: [] } });
    const [checkedToppings, setCheckedToppings] = useState([]);
    const [name, setName] = useState('');
    const [isDisabled, setIsDisabled] = useState(true)

    useEffect(() => {
        if (order?.pizza?.type && checkedToppings?.length && name) setIsDisabled(false)
        else { setIsDisabled(true) }
    }, [order.pizza.type, checkedToppings, name])


    const handleInputChange = (e) => {
        setName(e.target.value)

    };

    const handlePizzaTypeChange = (value) => {
        setOrder({ ...order, pizza: { ...order.pizza, type: value } });
    };

    const handleToppingChange = (checkedValues) => {
        setCheckedToppings(checkedValues);
    };

    const handleSubmit = () => {
        let orderPayload = { ...order, pizza: { ...order.pizza, toppings: checkedToppings, name } };
        setOrder({ ...orderPayload });

        axios
            .post('http://localhost:8000/api/orders', orderPayload)
            .then((response) => {
                console.log(response.data.message);
            })
            .catch((error) => {
                console.error('Error placing order:', error.message);
            });
    };



    return (
        <div className="newOrder-container">
            <div className='createOrder_desktop_formLogoContainer'>
                <img src={nominos} className="createOrder_logo" />
                <Form onFinish={handleSubmit} className="newOrder_formContainer">
                    <Form.Item label="Your Name" name="name" className='newOrder_formLabel'  >
                        <Input name="name" value={order.name} onChange={handleInputChange} className="transparent_input" />
                    </Form.Item>

                    <Form.Item label="Pizza Type" name="type" className='newOrder_formLabel' >
                        <Select placeholder="Select a pizza type" value={order.pizza.type} onChange={handlePizzaTypeChange} className="transparent_input">
                            {pizzaTypes.map((pizzaType) => (
                                <Option key={pizzaType} value={pizzaType}>
                                    {pizzaType}
                                </Option>
                            ))}
                        </Select>
                    </Form.Item>


                    <div className='newOrder_toppingsContainer'>
                        <Form.Item label="Toppings" name="toppings" className='newOrder_formLabel'>
                            <Checkbox.Group
                                value={checkedToppings}
                                onChange={handleToppingChange}
                                className="newOrder_checkboxGroup"
                            >
                                <div className="checkbox-grid">
                                    {toppings.map((topping) => (
                                        <Checkbox key={topping} value={topping} className="newOrder_checkboxText">
                                            {topping}
                                        </Checkbox>
                                    ))}
                                </div>
                            </Checkbox.Group>
                        </Form.Item>
                    </div>

                    <Form.Item className='createOrder_formButton'>
                        <Button type="primary" block={true} htmlType="submit" style={{ backgroundColor: '#3C4FD1' }} disabled={isDisabled} >
                            Place Order
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    );
};

export default NewOrderPage;

