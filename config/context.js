const jwt = require('jwt-simple')

module.exports = async ({ req }) => {
    await require('./simulateLoggedUser')(req)

    const auth = req.headers.authorization
    const token = auth && auth.substring(7)

    let user = null
    let admin = false

    if(token) {
        try {
            let contentToken = jwt.decode(token,
                process.env.APP_AUTH_SECRET)
            if(new Date(contentToken.exp * 1000) > new Date()) {
                user = contentToken
            }
        } catch(e) {
            // invalid token
        }
    }

    if(user && user.profiles) {
        admin = user.profiles.includes('administrator')
    }

    const err = new Error('Access denied!')

    return {
        user: user,
        admin,
        checkUser() {
            if(!user) throw err
        },
        checkAdmin() {
            if(!admin) throw err
        },
        checkUserFilter(filter) {
            if(admin) return

            if(!user) throw err
            if(!filter) throw err

            const { id, email } = filter
            if(!id && !email) throw err
            if(id && id !== user.id) throw err
            if(email && email !== user.email) throw err
        }
    }
}