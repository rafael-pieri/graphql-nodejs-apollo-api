const db = require('../../config/db')

module.exports = {
    profiles(parent, args, ctx) {
        ctx && ctx.checkAdmin()
        return db('profile')
    },
    profile(_, { filter }, ctx) {
        ctx && ctx.checkAdmin()
        
        if(!filter) return null
        const { id, name } = filter
        if(id) {
            return db('profile')
                .where({ id })
                .first()
        } else if(name) {
            return db('profile')
                .where({ name })
                .first()
        } else {
            return null
        }
    }
}