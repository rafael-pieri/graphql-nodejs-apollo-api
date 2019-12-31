const db = require('../../config/db')
const { profile: getProfile } = require('../query/profile')

module.exports = {
    async insertProfile(_, { data }, ctx) {
        ctx && ctx.checkAdmin()
       
        try {
            const [ id ] = await db('profile')
                .insert(data)
            return db('profile')
                .where({ id }).first()
        } catch(e) {
            throw new Error(e.sqlMessage)
        }
    },
    async removeProfile(_, args, ctx) {
        ctx && ctx.checkAdmin()

        try {
            const profile = await getProfile(_, args)
            if(profile) {
                const { id } = profile
                await db('user_profile')
                    .where({ profile_id: id }).delete()
                await db('profile')
                    .where({ id }).delete()
            }
            return profile
        } catch(e) {
            throw new Error(e.sqlMessage)
        }
    },
    async updateProfile(_, { filter, data }, ctx) {
        ctx && ctx.checkAdmin()
        try {
            const profile = await getProfile(_, { filter })
            if(profile) {
                const { id } = profile
                await db('profile')
                    .where({ id })
                    .update(data)
            }
            return { ...profile, ...data }
        } catch(e) {
            throw new Error(e.sqlMessage)
        }
    }
}