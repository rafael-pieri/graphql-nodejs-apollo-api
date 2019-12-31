exports.up = function up(knex) {
    return knex.schema.createTable('user', table => {
        table.increments('id').primary()
        table.string('name').notNull()
        table.string('email').notNull().unique()
        table.string('password', 60)
        table.boolean('active')
            .notNull().defaultTo(true)
        table.timestamp('created_at')
            .defaultTo(knex.fn.now())
    }).then(function () {
        return knex('user').insert([{
                name: 'admin',
                email: 'admin@admin.com.br',
                password: '$2a$10$3uMAUH9thyhR14DLP9t/eeZw7uDr2sMZx5FI38JZWFr9rlgVonzGe',
                active: 1,
                created_at: knex.fn.now()
            }
        ])
    })
}

exports.down = function down(knex) {
    return knex.schema.dropTable('user')
}