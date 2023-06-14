const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 8000;
const http = require('http');
const { Server } = require("socket.io");

const cors = require('cors');

const PizzaRestaurant = require('./PizzaRestaurant');

app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
    }
})

io.on('connection', (socket) => {
    console.log('Client Connected' + socket.id);


});

const pizzaRestaurant = new PizzaRestaurant(io);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('/api/orders', (req, res) => {
    const order = req.body;
    pizzaRestaurant.placeOrder(order.pizza);
    res.json({ message: 'Order placed successfully.' });
});

app.get('/api/orders', (req, res) => {
    const orders = pizzaRestaurant.getAllOrders();
    res.json(orders);
});

server.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
