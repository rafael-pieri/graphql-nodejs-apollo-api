const db = require('../../config/db')

module.exports = {
    profiles(user) {
        return db('profile')
            .join(
                'user_profile',
                'profile.id',
                'user_profile.profile_id'
            )
            .where({
                user_id: user.id
            })
    }
}