exports.up = function up(knex) {
    return knex.schema.createTable('profile', table => {
        table.increments('id').primary()
        table.string('name').notNull().unique()
        table.string('label').notNull()
    }).then(function () {
        return knex('profile').insert([{
                name: 'common',
                label: 'common'
            },
            {
                name: 'administrator',
                label: 'Administrator'
            },
        ])
    })
}

exports.down = function down(knex) {
    return knex.schema.dropTable('profile')
}