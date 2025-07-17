import { Knex } from 'knex';
import Projects from '../interface/Projects';
import Classes from '../interface/Classes';
import Data from '../interface/Data';
import Annotation from '../interface/Annotation/Annotation';
import Bbox from '../interface/Annotation/Bbox';
import Mask from '../interface/Annotation/Mask';
import { ANNOTATION_TABLE, BOUNDING_BOX_TABLE, CLASS_TABLE, DATA_TABLE, MASK_TABLE, PROJECT_TABLE } from '../../const/arc';


async function getProjects(db: Knex): Promise<Projects[]> {
    try {
        const projects: Projects[] = await db(PROJECT_TABLE).select('*');
        return projects;
    } catch (error) {
        console.error('Error fetching projects:', error);
        throw error;
    }
}
async function findClassesByProjectId(db: Knex, projectId: number): Promise<Classes[]> {
    try {
        const classes: Classes[] = await db(CLASS_TABLE).where({ project_id: projectId });
        return classes;
    } catch (error) {
        console.error('Error fetching classes by project ID:', error);
        throw error;
    }
}

async function findDataByProjectId(db: Knex, projectId: number): Promise<Data[]> {
    try {
        const data: Data[] = await db(DATA_TABLE).where({ project_id: projectId });
        return data;
    } catch (error) {
        console.error('Error fetching data by project ID:', error);
        throw error;
    }
}

async function findAnnotationsByDataId(db: Knex, dataId: number): Promise<Annotation[]> {
    try {
        const annotations: Annotation[] = await db(ANNOTATION_TABLE).where({ data_id: dataId });
        return annotations;
    } catch (error) {
        console.error('Error fetching annotations by data ID:', error);
        throw error;
    }
}

async function findDataAnnotationById(db: Knex, classId: number): Promise<(Bbox | Mask)[]> {
    try {
        const bboxes: Bbox[] = await db(BOUNDING_BOX_TABLE).where({ annotation_id: classId });
        const masks: Mask[] = await db(MASK_TABLE).where({ annotation_id: classId });
        return Array.from(new Set([...bboxes, ...masks]));
    } catch (error) {
        console.error('Error fetching class by ID:', error);
        throw error;
    }
}

export { getProjects, findClassesByProjectId, findAnnotationsByDataId, findClassesTypeById, findDataByProjectId };