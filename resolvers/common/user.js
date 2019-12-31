const jwt = require('jwt-simple')
const { profiles: getProfiles } = require('../type/User')

module.exports = {
    async getLoggedUser(user) {
        const profiles = await getProfiles(user)
        const now = Math.floor(Date.now() / 1000)

        const userInfo = {
            id: user.id,
            name: user.name,
            email: user.email,
            profiles: profiles.map(p => p.name),
            iat: now,
            exp: now + (3 * 24 * 60 * 60)
        }

        
        return {
            ...userInfo,
            token: jwt.encode(userInfo,
                process.env.APP_AUTH_SECRET)
        }
    }
}