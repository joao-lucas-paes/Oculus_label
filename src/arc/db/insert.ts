import { Knex } from 'knex';
import Classes from '../interface/Classes';
import Data from '../interface/Data';
import Annotation from '../interface/Annotation/Annotation';
import BBox from '../interface/Annotation/Bbox';
import Mask from '../interface/Annotation/Mask';
import Projects from '../interface/Projects';

async function insertClasses(db: Knex, classes: Classes[]): Promise<number[]> {
    try {
        const insertedIds = await db('classes').insert(classes);
        return insertedIds;
    } catch (error) {
        // @TODO Adicionar Loggers aqui
        console.error('Some kind of error in inserting classes:', error);
        throw error;
    }
}

async function insertData(db: Knex, data: Data[]): Promise<number[]> {
    try {
        const insertedIds = await db('data').insert(data);
        return insertedIds;
    } catch (error) {
        // @TODO Adicionar Loggers aqui
        console.error('Some kind of error in inserting classes:', error);
        throw error;
    }
}

async function insertAnnotations(db: Knex, annotations: Annotation[]): Promise<number[]> {
    try {
        const insertedIds = await db('annotations').insert(annotations);
        return insertedIds;
    } catch (error) {
        // @TODO Adicionar Loggers aqui
        console.error('Some kind of error in inserting annotations:', error);
        throw error;
    }
}

async function insertBoundingBoxes(db: Knex, boundingBoxes: BBox[]): Promise<number[]> {
    try {
        const insertedIds = await db('bounding_boxes').insert(boundingBoxes);
        return insertedIds;
    } catch (error) {
        // @TODO Adicionar Loggers aqui
        console.error('Some kind of error in inserting bounding boxes:', error);
        throw error;
    }
}

async function insertMasks(db: Knex, masks: Mask[]): Promise<number[]> {
    try {
        const insertedIds = await db('masks').insert(masks);
        return insertedIds;
    } catch (error) {
        // @TODO Adicionar Loggers aqui
        console.error('Some kind of error in inserting masks:', error);
        throw error;
    }
}

async function insertProjects(db: Knex, projects: Projects[]): Promise<number[]> {
    try {
        const insertedIds = await db('projects').insert(projects);
        return insertedIds;
    } catch (error) {
        // @TODO Adicionar Loggers aqui
        console.error('Some kind of error in inserting projects:', error);
        throw error;
    }
}


export default {
    insertClasses,
    insertData,
    insertAnnotations,
    insertBoundingBoxes,
    insertMasks,
    insertProjects
};