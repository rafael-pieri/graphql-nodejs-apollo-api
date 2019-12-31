const db = require('../../config/db')

module.exports = {
    users(profile) {
        return db('user')
            .join(
                'user_profile',
                'user.id',
                'user_profile.user_id'
            )
            .where({
                profile_id: profile.id
            })
    }
}