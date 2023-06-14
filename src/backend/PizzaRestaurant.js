const Order = require('./Order');

const allOrders = {

}

class PizzaRestaurant {

    constructor(io) {
        this.io = io;
        this.orders = [];
        this.doughChefs = 2;
        this.toppingChefs = 3;
        this.ovenCapacity = 1;
        this.waiters = 2;
        this.doughQueue = [];
        this.toppingQueue = [];
        this.cookingQueue = [];
        this.servingQueue = [];
        this.orderIdCounter = 1;
    }

    placeOrder(order) {
        const newOrder = new Order({
            orderId: this.orderIdCounter++,
            ...order
        })
        this.orders.push(newOrder);
        this.io.emit('order_status', newOrder)
        this.processOrder();
    }

    processOrder() {
        // start making dough
        if (this.orders.length) {
            this.callDoughChef();
        }
    }

    callDoughChef() {
        if (!this.doughChefs) return;
        this.doughChefs--;
        let order = this.orders.shift();
        order.status = "Dough Chef"
        this.io.emit('order_status', order)
        this.prepareDough(order);

    }

    prepareDough(order) {
        this.doughQueue.push(order);
        setTimeout(() => {
            this.doughChefs++;
            this.processToppings(order);
            this.processOrder();
        }, 7000);
    }

    processToppings(order) {
        if (order)
            this.toppingQueue.push(order);

        if (!this.toppingChefs || !this.toppingQueue.length) return;
        order = this.toppingQueue.shift();
        order.status = "Topping Chef"
        this.io.emit('order_status', order)
        this.addToppings(order);

    }


    addToppings(order) {
        console.log('Adding Toppings', order, typeof order);
        this.toppingChefs--;
        setTimeout(() => {
            this.processCooking(order);
            this.toppingChefs++;
            this.processToppings();
        }, 4000 * order.toppings.length);
    }

    processCooking(order) {
        if (order) this.cookingQueue.push(order);
        if (!this.ovenCapacity || !this.cookingQueue.length) return;
        order = this.cookingQueue.shift();
        order.status = 'Oven';
        this.io.emit('order_status', order)
        this.cookPizza(order);

    }

    cookPizza(order) {
        console.log('Cooking Pizza')
        this.ovenCapacity--;
        setTimeout(() => {
            this.ovenCapacity++;
            this.processCooking();
            this.servePizza(order);

        }, 10000);
    }


    servePizza(order) {
        if (order) this.servingQueue.push(order);
        if (!this.servingQueue.length || !this.waiters) return;
        order = this.servingQueue.shift();
        order.status = 'Serving';
        this.io.emit('order_status', order)
        this.servingPizza(order);
    }

    servingPizza(order) {
        this.waiters--;
        setTimeout(() => {
            order.status = 'Done';
            this.io.emit('order_status', order)
            this.waiters++;
        }, 5000);
    }


}

module.exports = PizzaRestaurant;










