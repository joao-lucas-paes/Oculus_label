import { Knex } from 'knex';
import classesInterface from '@arc/dtos/Classes';
import dataInterface from '@arc/dtos/Data';
import annotationInterface from '@arc/dtos/Annotation/Annotation';
import bBoxInterface from '@arc/dtos/Annotation/Bbox';
import maskInterface from '@arc/dtos/Annotation/Mask';
import projectsInterface from '@arc/dtos/Projects';
import { ANNOTATION_TABLE, BOUNDING_BOX_TABLE, CLASS_TABLE, DATA_TABLE, MASK_TABLE, PROJECT_TABLE } from '@const/arc';

async function insertClasses(db: Knex, classes: classesInterface[]): Promise<number[]> {
    try {
        const insertedIds = await db(CLASS_TABLE).insert(classes);
        return insertedIds;
    } catch (error) {
        // @TODO Adicionar Loggers aqui
        console.error('Some kind of error in inserting classes:', error);
        throw error;
    }
}

async function insertData(db: Knex, data: dataInterface[]): Promise<number[]> {
    try {
        const insertedIds = await db(DATA_TABLE).insert(data);
        return insertedIds;
    } catch (error) {
        // @TODO Adicionar Loggers aqui
        console.error('Some kind of error in inserting Data Table:', error);
        throw error;
    }
}

async function insertAnnotations(db: Knex, annotations: annotationInterface[]): Promise<number[]> {
    try {
        const insertedIds = await db(ANNOTATION_TABLE).insert(annotations);
        return insertedIds;
    } catch (error) {
        // @TODO Adicionar Loggers aqui
        console.error('Some kind of error in inserting annotations:', error);
        throw error;
    }
}

async function insertBoundingBoxes(db: Knex, boundingBoxes: bBoxInterface[]): Promise<number[]> {
    try {
        const insertedIds = await db(BOUNDING_BOX_TABLE).insert(boundingBoxes).onConflict(["annotation_id", "x_min", "x_max", "y_max", "y_min"]).ignore();
        return insertedIds;
    } catch (error) {
        // @TODO Adicionar Loggers aqui
        console.error('Some kind of error in inserting bounding boxes:', error);
        throw error;
    }
}

async function insertMasks(db: Knex, masks: maskInterface[]): Promise<number[]> {
    try {
        const insertedIds = await db(MASK_TABLE).insert(masks);
        return insertedIds;
    } catch (error) {
        // @TODO Adicionar Loggers aqui
        console.error('Some kind of error in inserting masks:', error);
        throw error;
    }
}

async function insertProjects(db: Knex, projects: projectsInterface[]): Promise<number[]> {
    try {
        const insertedIds = await db(PROJECT_TABLE).insert(projects);
        return insertedIds;
    } catch (error) {
        // @TODO Adicionar Loggers aqui
        console.error('Some kind of error in inserting projects:', error);
        throw error;
    }
}


export {
    insertClasses,
    insertData,
    insertAnnotations,
    insertBoundingBoxes,
    insertMasks,
    insertProjects
};