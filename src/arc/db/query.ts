import { Knex } from 'knex';
import Projects from '../interface/Projects';
import Classes from '../interface/Classes';
import { Data } from 'electron';
import Annotation from '../interface/Annotation/Annotation';
import Bbox from '../interface/Annotation/Bbox';
import Mask from '../interface/Annotation/Mask';


async function getProjects(db: Knex): Promise<Projects[]> {
    try {
        const projects: Projects[] = await db('projects').select('*');
        return projects;
    } catch (error) {
        console.error('Error fetching projects:', error);
        throw error;
    }
}
async function findClassesByProjectId(db: Knex, projectId: number): Promise<Classes[]> {
    try {
        const classes: Classes[] = await db('classes').where({ project_id: projectId });
        return classes;
    } catch (error) {
        console.error('Error fetching classes by project ID:', error);
        throw error;
    }
}

async function findDataByProjectId(db: Knex, projectId: number): Promise<Data[]> {
    try {
        const data: Data[] = await db('data').where({ project_id: projectId });
        return data;
    } catch (error) {
        console.error('Error fetching data by project ID:', error);
        throw error;
    }
}

async function findAnnotationsByDataId(db: Knex, dataId: number): Promise<Annotation[]> {
    try {
        const annotations: Annotation[] = await db('annotations').where({ data_id: dataId });
        return annotations;
    } catch (error) {
        console.error('Error fetching annotations by data ID:', error);
        throw error;
    }
}

async function findClassesTypeById(db: Knex, classId: number): Promise<(Bbox | Mask)[]> {
    try {
        const bboxes: Bbox[] = await db('BoundingBox').where({ annotation_id: classId });
        const masks: Mask[] = await db('Mask').where({ annotation_id: classId });
        return Array.from(new Set([...bboxes, ...masks]));
    } catch (error) {
        console.error('Error fetching class by ID:', error);
        throw error;
    }
}

export { getProjects, findClassesByProjectId, findAnnotationsByDataId, findClassesTypeById, findDataByProjectId };