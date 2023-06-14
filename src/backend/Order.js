class Order {

    constructor({ toppings = [], _id, orderId, name }) {
        this._id = _id;
        this.orderId = orderId
        this.status = 'Pending';
        this.toppings = toppings;
        this.dough = this.dough;
        this.isCooking = false;
        this.orderPlacedAt = Date.now();
        this.processedAt = null;
        this.name = name
    }


}



module.exports = Order;