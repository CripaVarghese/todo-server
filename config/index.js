const DB_NAME = process.env.DB_NAME || 'todo-db';
const DB_DOMAIN = process.env.DB_DOMAIN || 'mongodb://localhost';
const DB_URL = `${DB_DOMAIN}/${DB_NAME}`

const CLIENT_URLS = process.env.CLIENT_URLS?.split(",");

export default {
    port: process.env.PORT || 5000,
    db: {
        name: DB_NAME,
        baseUrl: DB_URL
    },
    cors: {
        origin: CLIENT_URLS,
        optionsSuccessStatus: 200,
        credentials: true,
        allowedHeaders: ['Content-Type', 'Authorization'],
    },
    auth: {
        secret: process.env.AUTH,
        expiry: process.env.EXPIRY || "2 days",
        refresh : {
            secret: process.env.REFRESH_TOKEN_SECRET,
            expiry: process.env.EXPIRY || "1 mo"
        }
    }
}

