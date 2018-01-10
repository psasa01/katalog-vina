module.exports = {
    facebook: {
        clientID: process.env.FACEBOOK_ID || '712105322328284',
        clientSecret: process.env.FACEBOOK_SECRET || 'd6b34140f75823a680753c615de1eecd',
        profileFields: ['id', 'emails', 'name'],
        callbackURL: 'http://localhost:7777/auth/facebook/callback'
    }
}