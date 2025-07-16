import { Knex } from 'knex';
import Projects from '../interface/Projects';
import Classes from '../interface/Classes';
import Data from '../interface/Data';
import Annotation from '../interface/Annotation/Annotation';
import Bbox from '../interface/Annotation/Bbox';
import Mask from '../interface/Annotation/Mask';

async function modifyDataTables(db: Knex, data: Data): Promise<void> {
    await modifyTable(db, data, 'data');
}

async function modifyAnnotationTables(db: Knex, data: Annotation): Promise<void> {
    await modifyTable(db, data, 'annotation');
}

async function modifyBoundingBoxTables(db: Knex, data: Bbox): Promise<void> {
    await modifyTable(db, data, 'BoundingBox');
}

async function modifyMaskTables(db: Knex, data: Mask): Promise<void> {
    await modifyTable(db, data, 'Mask');
}

async function modifyProjectTables(db: Knex, data: Projects): Promise<void> {
    await modifyTable(db, data, 'projects');
}

async function modifyClassTables(db: Knex, data: Classes): Promise<void> {
    await modifyTable(db, data, 'classes');
}

async function modifyTable(db: Knex, data: Projects | Data | Classes | Annotation | Bbox | Mask, tableName: string): Promise<void> {
    const existingData = await db('data').where({ id: data.id }).update(data);
    if (!existingData) {
        throw new Error(`${tableName} with ID ${data.id} not found.`);
    }
}

export {
    modifyDataTables,
    modifyAnnotationTables,
    modifyBoundingBoxTables,
    modifyMaskTables,
    modifyProjectTables,
    modifyClassTables
};