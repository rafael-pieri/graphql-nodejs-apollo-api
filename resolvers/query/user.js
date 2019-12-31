const db = require('../../config/db')
const bcrypt = require('bcrypt-nodejs')
const { getLoggedUser } = require('../common/user')

module.exports = {
    async login(_, { data }) {
        const user = await db('user')
            .where({ email: data.email })
            .first()

        if(!user) {
            throw new Error('Invalid credentials')
        }

        const areEquals = bcrypt.compareSync(data.password,
            user.password)

        if(!areEquals) {
            throw new Error('Invalid credentials')
        }

        return getLoggedUser(user)
    },
    users(parent, args, ctx) {
        ctx && ctx.checkAdmin()
        return db('user')
    },
    user(_, { filter }, ctx) {
        ctx && ctx.checkUserFilter(filter)
        
        if(!filter) return null
        const { id, email } = filter
        if(id) {
            return db('user')
                .where({ id })
                .first()
        } else if(email) {
            return db('user')
                .where({ email })
                .first()
        } else {
            return null
        }
    },
}