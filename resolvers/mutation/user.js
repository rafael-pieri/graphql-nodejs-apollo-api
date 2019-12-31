const bcrypt = require('bcrypt-nodejs')
const db = require('../../config/db')
const { profile: getProfile } = require('../query/profile')
const { user: getUser } = require('../query/user')

const mutations = {
    registerUser(_, { data }) {
        return mutations.insertUser(_, {
            data: {
                name: data.name,
                email: data.email,
                password: data.password,
            }
        })
    },
    async insertUser(_, { data }, ctx) {
        ctx && ctx.checkAdmin()

        try {
            const idsProfiles = []

            if(!data.profiles || !data.profiles.length) {
                data.profiles = [{
                    name: 'common'
                }]
            }

            for(let filter of data.profiles) {
                const profile = await getProfile(_, {
                    filter
                })
                if(profile) idsProfiles.push(profile.id)
            }

            const salt = bcrypt.genSaltSync()
            data.password = bcrypt.hashSync(data.password, salt)

            delete data.profiles
            const [ id ] = await db('user')
                .insert(data)

            for(let profile_id of idsProfiles) {
                await db('user_profile')
                    .insert({ profile_id, user_id: id })
            }

            return db('user')
                .where({ id }).first()
        } catch(e) {
            throw new Error(e.sqlMessage)
        }
    },
    async removeUser(_, args, ctx) {
        ctx && ctx.checkAdmin()
        try {
            const user = await getUser(_, args)
            if(user) {
                const { id } = user
                await db('user_profile')
                    .where({ user_id: id }).delete()
                await db('user')
                    .where({ id }).delete()
            }
            return user
        } catch(e) {
            throw new Error(e.sqlMessage)
        }

    },
    async updateUser(_, { filter, data }, ctx) {
        ctx && ctx.checkUserFilter(filter)
        try {
            const user = await getUser(_, { filter })
            if(user) {
                const { id } = user
                if(ctx.admin && data.profiles) {
                    await db('user_profile')
                        .where({ user_id: id }).delete()

                    for(let filter of data.profiles) {
                        const profile = await getProfile(_, {
                            filter
                        })
                        
                        if(profile) {
                            await db('user_profile')
                                .insert({
                                    profile_id: profile.id,
                                    user_id: id
                                })
                        }
                    }
                }

                if(data.password) {
                    const salt = bcrypt.genSaltSync()
                    data.password = bcrypt.hashSync(data.password, salt)
                }

                delete data.profiles
                await db('user')
                    .where({ id })
                    .update(data)
            }
            return !user ? null : { ...user, ...data }
        } catch(e) {
            throw new Error(e)
        }
    }
}

module.exports = mutations