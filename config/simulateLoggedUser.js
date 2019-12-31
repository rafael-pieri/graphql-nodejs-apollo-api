const db = require('./db')
const { getLoggedUser } = require('../resolvers/common/user')

const sql = `
    select
        u.*
    from
        user u,
        user_profile up,
        profile p
    where
        up.user_id = u.id and
        up.profile_id = p.id and
        u.active = 1 and
        p.name = :nameProfile
    limit 1
`

const getUser = async nameProfile => {
    const response = await db.raw(sql, { nameProfile })
    return response ? response[0][0] : null
}

module.exports = async req => {
    const user = await getUser('admin')
    if(user) {
        const { token } = await getLoggedUser(user)
        req.headers = {
            authorization: `Bearer ${token}`
        }
    }
}