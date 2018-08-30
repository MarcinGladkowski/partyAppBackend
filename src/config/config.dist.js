import database from "./database";

// required environment variables
['NODE_ENV', 'PORT'].forEach((name) => {
    if (!process.env[name]) {
        throw new Error(`Environment variable ${name} is missing`)
    }
});

export default  {
    env: process.env.NODE_ENV,
    server: {
        port: Number(process.env.PORT)
    },
    secret: '1233456',
    emailAccount: {
        user: `user`,
        password: `password`
    },
    database: {
        mongoUrl: `mongo_db_url`
    }
};