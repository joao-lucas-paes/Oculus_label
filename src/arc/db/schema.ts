import knex from 'knex';
import { ANNOTATION_TABLE, BOUNDING_BOX_TABLE, CLASS_TABLE, DATA_TABLE, MASK_TABLE, PROJECT_TABLE } from '../../const/arc';

export function createSchema(dbConnection: knex.Knex) {
    return dbConnection.schema.createTable(PROJECT_TABLE, createProjectsTable())
    .createTable(CLASS_TABLE, createClassesTable())
    .createTable(DATA_TABLE, createDataTable())
    .createTable(ANNOTATION_TABLE, createAnnotationTable())
    .createTable(BOUNDING_BOX_TABLE, createBoundingBoxTable())
    .createTable(MASK_TABLE, createMaskTable());
}

function createMaskTable(): (tableBuilder: knex.Knex.CreateTableBuilder) => any {
    return (table) => {
        table.increments();
        table
            .integer('annotation_id')
            .unsigned()
            .references('id')
            .inTable(ANNOTATION_TABLE)
            .onDelete('CASCADE')
            .onUpdate('CASCADE');
        table.json('mask').notNullable();
    }
};

function createBoundingBoxTable(): (tableBuilder: knex.Knex.CreateTableBuilder) => any {
    return (table) => {
        table.increments();

        table
            .integer('annotation_id')
            .unsigned()
            .references('id')
            .inTable(ANNOTATION_TABLE)
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
            .inTable(CLASS_TABLE)
            .onDelete('CASCADE')
            .onUpdate('CASCADE');

        table
            .integer('data_id')
            .unsigned()
            .references('id')
            .inTable(DATA_TABLE)
            .onDelete('CASCADE')
            .onUpdate('CASCADE');

        table.text('caption');

        table.timestamps(true, true);
    };
}

function createDataTable(): (tableBuilder: knex.Knex.CreateTableBuilder) => any {
    return (table) => {
        table.increments();

        
        table.string('name').notNullable();
        table.integer('frame_index').defaultTo(-1); // -1 means not a video, 0 means a video

        table
            .integer('project_id')
            .unsigned()
            .references('id')
            .inTable(PROJECT_TABLE)
            .onDelete('CASCADE')
            .onUpdate('CASCADE');

        table.timestamps(true, true);
    };
}

function createProjectsTable(): (tableBuilder: knex.Knex.CreateTableBuilder) => any {
    return (table) => {
        table.increments();
        table.string('name').notNullable().unique();
        table.text('root_path').notNullable();
        table.text('description');
        table.timestamps(true, true);
    };
}

function createClassesTable(): (tableBuilder: knex.Knex.CreateTableBuilder) => any {
    return (table) => {
        table.increments('id').primary(); // table id
        
        // columns
        table.integer('class_id').notNullable(); // class id
        table.integer('project_id').unsigned().notNullable();
        table.string('name').notNullable().unique();
        table.text('description');
        table.integer('r').notNullable(); // red
        table.integer('g').notNullable(); // green
        table.integer('b').notNullable(); // blue

        table.unique(['class_id', 'project_id']); // unique constraint on class_id and project_id

        // foreign key
        table
            .foreign('project_id')
            .references('id')
            .inTable(PROJECT_TABLE)
            .onDelete('CASCADE')
            .onUpdate('CASCADE');

        table.timestamps(true, true);
    };
}
