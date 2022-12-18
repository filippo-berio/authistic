export default () => ({
    type: 'postgres',
    host: 'auth-postgres',
    port: 5432,
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB
})

export const DATABASE_CONFIG = {
    type: 'postgres',
    host: 'auth-postgres',
    port: 5432,
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB
};
