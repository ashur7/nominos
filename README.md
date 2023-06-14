# Restaurant Order Management App

This is a restaurant order management app that tracks pizza orders and updates their status in the "All Orders" page. It provides real-time updates on the order progress using web sockets and displays the information in a table format.

## Features

- Create a new order: Users can create a new pizza order by filling in all the necessary details on the "New Order" page.
- Real-time order updates: The app uses web sockets to update the order status in real time, reflecting the time taken at each step of the process.
- All Orders page: The "All Orders" page displays a table with the details of all the pizza orders, including their current status.

## Usage

To run the program, you have two options:

1. Using Docker image: You can use the provided Docker image to run the application directly. Ensure that Docker is installed on your machine and execute the following command:

   docker run -p 3000:3000 -p 8000:8000 nominos

2. Build your own Docker image: If you prefer to create a new Docker image, follow these steps:

   Clone the repository to your local machine.

   Navigate to the project's root directory.

   Build the Docker image using the provided Dockerfile:

   docker build -t <your-image-name> .

   ocker run -p 3000:3000 -p 8000:8000 <your-image-name>

Make sure to update the port mappings if required.

The frontend of the application will be accessible at http://localhost:3000, and the backend will be running on http://localhost:8000.

Dependencies

The project has the following dependencies:

Node.js (version 12 or higher)
React (version 16 or higher)
Socket.io (version 4 or higher)
Express (version 4 or higher)
Ant Design ( version 5 or higher )
Axios ( version 1 or higher )
body-parser ( version 1 or higher )

These dependencies are automatically installed when running the application using the Docker image or building your own image.

Feel free to explore and customize the code as per your requirements.
