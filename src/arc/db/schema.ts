import knex from 'knex';

export default function createSchema(dbConnection: knex.Knex) {
    return dbConnection.schema.createTable('classes', createClassesTable())
    .createTable('projects', createProjectsTable())
    .createTable('data', createDataTable())
    .createTable('annotation', createAnnotationTable())
    .createTable('BoundingBox', createBoundingBoxTable())
    .createTable('Mask', createMaskTable());
}

function createMaskTable(): (tableBuilder: knex.Knex.CreateTableBuilder) => any {
    return (table) => {
        table.increments();
        table
            .integer('annotation_id')
            .unsigned()
            .references('id')
            .inTable('annotation')
            .onDelete('CASCADE')
            .onUpdate('CASCADE');
    }
};

function createBoundingBoxTable(): (tableBuilder: knex.Knex.CreateTableBuilder) => any {
    return (table) => {
        table.increments();

        table
            .integer('annotation_id')
            .unsigned()
            .references('id')
            .inTable('annotation')
            .onDelete('CASCADE')
            .onUpdate('CASCADE');

        table.float('x_min').notNullable();
        table.float('y_min').notNullable();
        table.float('x_max').notNullable();
        table.float('y_max').notNullable();

        table.timestamps(true, true);
    };
}
/**
 * This function creates the Annotation, Classification and Caption tables in the database.
 * The table uses STI technique to store different types of annotations.
 * @returns A function that creates the Annotation table schema.
 */
function createAnnotationTable(): (tableBuilder: knex.Knex.CreateTableBuilder) => any {
    return (table) => {
        table.increments();

        table
            .integer('class_id')
            .unsigned()
            .references('id')
            .inTable('classes')
            .onDelete('CASCADE')
            .onUpdate('CASCADE');

        table
            .integer('project_id')
            .unsigned()
            .references('id')
            .inTable('projects')
            .onDelete('CASCADE')
            .onUpdate('CASCADE');

        table.text('data');

        table.timestamps(true, true);
    };
}

function createDataTable(): (tableBuilder: knex.Knex.CreateTableBuilder) => any {
    return (table) => {
        table.increments();

        
        table.string('name').notNullable();
        table.boolean('is_video').defaultTo(false);

        table
            .integer('project_id')
            .unsigned()
            .references('id')
            .inTable('projects')
            .onDelete('CASCADE')
            .onUpdate('CASCADE');

        table.timestamps(true, true);
    };
}

function createProjectsTable(): (tableBuilder: knex.Knex.CreateTableBuilder) => any {
    return (table) => {
        table.increments();
        table.string('name').notNullable().unique();
        table.text('path').notNullable();
        table.text('description');
        table.timestamps(true, true);
    };
}

function createClassesTable(): (tableBuilder: knex.Knex.CreateTableBuilder) => any {
    return (table) => {
        // compused primary key
        table.integer('id').unsigned().notNullable();
        table.integer('project_id').unsigned().notNullable();
        table.primary(['id', 'project_id']);

        //columns
        table.string('name').notNullable().unique();
        table.text('description');
        table.integer('r').notNullable(); // red
        table.integer('g').notNullable(); // green
        table.integer('b').notNullable(); // blue

        // foreign key
        table
            .foreign('project_id')
            .references('id')
            .inTable('projects')
            .onDelete('CASCADE')
            .onUpdate('CASCADE');

        table.timestamps(true, true);
    };
}
