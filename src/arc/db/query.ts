import { Knex } from 'knex';

import Projects from '../models/Projects';
import Classes from '../models/Classes';
import Data from '../models/Data';
import Annotation from '../models/Annotation/Annotation';
import Bbox from '../models/Annotation/Bbox';
import Mask from '../models/Annotation/Mask';
import { ANNOTATION_TABLE, BOUNDING_BOX_TABLE, CLASS_TABLE, DATA_TABLE, MASK_TABLE, PROJECT_TABLE } from '../../const/arc';


async function getProjects(db: Knex): Promise<Projects[]> {
    try {
        const projects: Projects[] = (await db(PROJECT_TABLE).select('*')).map((projects => {
            return new Projects(projects.id, projects.name, projects.root_path, projects.description);
        }));
        return projects;
    } catch (error) {
        console.error('Error fetching projects:', error);
        throw error;
    }
}
async function findClassesByProjectId(db: Knex, projectId: number): Promise<Classes[]> {
    try {
        const classes: Classes[] = (await db(CLASS_TABLE).where({ project_id: projectId })).map((cls: any) => {
            return new Classes(cls.id, cls.class_id, cls.project_id, cls.name, cls.description, cls.r, cls.g, cls.b);
        });
        return classes;
    } catch (error) {
        console.error('Error fetching classes by project ID:', error);
        throw error;
    }
}

async function findDataByProjectId(db: Knex, projectId: number): Promise<Data[]> {
    try {
        const data: Data[] = (await db(DATA_TABLE).where({ project_id: projectId })).map((d: any) => {
            return new Data(d.id, d.name, d.frame_index, d.project_id);
        });
        return data;
    } catch (error) {
        console.error('Error fetching data by project ID:', error);
        throw error;
    }
}

async function findAnnotationsByDataId(db: Knex, dataId: number): Promise<Annotation[]> {
    try {
        const annotations: Annotation[] = (await db(ANNOTATION_TABLE).where({ data_id: dataId })).map((ann: any) => {
            return new Annotation(ann.id, ann.class_id, ann.data_id, ann.caption);
        });
        return annotations;
    } catch (error) {
        console.error('Error fetching annotations by data ID:', error);
        throw error;
    }
}

async function findDataAnnotationByAnnotationId(db: Knex, annotationId: number): Promise<(Bbox | Mask)[]> {
    try {
        const bboxes: Bbox[] = (await db(BOUNDING_BOX_TABLE).where({ annotation_id: annotationId })).map((bbox: any) => {
            return new Bbox(bbox.id, bbox.annotation_id, bbox.x_min, bbox.y_min, bbox.x_max, bbox.y_max);
        });
        const masks: Mask[] = (await db(MASK_TABLE).where({ annotation_id: annotationId })).map((mask: any) => {
            return new Mask(mask.id, mask.annotation_id, mask.mask);
        });
        return Array.from(new Set([...bboxes, ...masks]));
    } catch (error) {
        console.error('Error fetching class by ID:', error);
        throw error;
    }
}

export { getProjects, findClassesByProjectId, findAnnotationsByDataId, findDataAnnotationByAnnotationId, findDataByProjectId };