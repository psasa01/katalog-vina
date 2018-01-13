module.exports = {
    facebook: {
        clientID: process.env.FACEBOOK_ID || '712105322328284',
        clientSecret: process.env.FACEBOOK_SECRET || 'd6b34140f75823a680753c615de1eecd',
        profileFields: ['id', 'emails', 'name'],
        callbackURL: process.env.FACEBOOK_CALLBACK
    },
    mailer: {
        MAILGUN_USER: 'postmaster@sandbox7510097b9bed48eeb09c15428748bc84.mailgun.org',
        MAILGUN_PASSWORD: 'a531312e62a550214d4791acfac03e12'

    }
}