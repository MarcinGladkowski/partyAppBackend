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
    secret: 'bb34b5cb95fcb0869b9b54b115032c13',
    emailAccount: {
        user: `gladkiwrc@gmail.com`,
        password: `leszekkuzaj`
    },
    database: {
        mongoUrl: "mongodb://marcin:marcin123@ds163610.mlab.com:63610/party-app-db"
    }
};