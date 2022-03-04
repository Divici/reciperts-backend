module.exports = {
    JWT_SECRET: process.env.JWT_SECRET || 'shhthisisasecret',
    BCRYPT_ROUNDS: process.env.BCRYPT_ROUNDS || 8
}