import express from 'express';
import bodyParser from 'body-parser';
// import categoryRoutes from './routes/category.routes';
// import productRoutes  from './routes/product.routes';
import userRoutes  from './routes/user.routes';
// import  UserAddressRoute  from './routes/userAddress.routes';
import CartRoute from './routes/cart.routes';
//import { Server as SocketIOServer } from 'socket.io';
// import http from 'http';
// import cors from 'cors';

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(express.json()); // Add this before routes

// ejs template
app.set('view-engin','ejs');
app.get('/', (req, res) => {
    res.render('index.ejs');
})

//const server = http.createServer(app);

//const io = new SocketIOServer(server, { /* options */ });

// Listen for Socket.IO connections
// io.on('connection', (socket) => {
//   console.log('A client connected:', socket.id);

//   // Handle disconnection
//   socket.on('disconnect', () => {
//     console.log('A client disconnected:', socket.id);
//   });
// });
// io.listen(4004);

// Configure CORS for Express
// app.use(cors({
//     origin: 'http://localhost:400', // Your frontend URL
//     methods: ['GET', 'POST', 'PUT', 'DELETE'],
//     credentials: true,
//   }));

// const io = new SocketIOServer(server, {
//     cors: {
//       origin: '*', // Replace '*' with your frontend URL in production
//       methods: ['GET', 'POST'],
//     },
//   });

// Pass `io` instance to routes
// app.use((req, res, next) => {
//     (req as any).io = io; // Attach `io` to the request object
//     next();
//   });


// Routes
//app.use('/api/categories', categoryRoutes);
// app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
// app.use('/api/users-address', UserAddressRoute);
app.use('/api/cart', CartRoute);

export default app;
