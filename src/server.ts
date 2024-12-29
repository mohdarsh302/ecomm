
import sequelize from './config/db';
import app from './app';
const PORT = process.env.PORT || 4003;

// Test DB connection and start server
(async () => {
    try {
        await sequelize.authenticate();
        console.log('Database connected successfully!');
        await sequelize.sync();
        app.listen(PORT, () => {
            console.log(`Server is running at http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
})();
