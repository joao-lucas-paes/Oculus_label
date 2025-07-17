import { Knex } from 'knex';
import Projects from '../interface/Projects';
import Classes from '../interface/Classes';
import Data from '../interface/Data';
import Annotation from '../interface/Annotation/Annotation';
import Bbox from '../interface/Annotation/Bbox';
import Mask from '../interface/Annotation/Mask';
import { ANNOTATION_TABLE, BOUNDING_BOX_TABLE, CLASS_TABLE, DATA_TABLE, MASK_TABLE, PROJECT_TABLE } from '../../const/arc';

async function modifyDataTables(db: Knex, data: Data): Promise<void> {
    await modifyTable(db, data, DATA_TABLE);
}

async function modifyAnnotationTables(db: Knex, data: Annotation): Promise<void> {
    await modifyTable(db, data, ANNOTATION_TABLE);
}

async function modifyBoundingBoxTables(db: Knex, data: Bbox): Promise<void> {
    await modifyTable(db, data, BOUNDING_BOX_TABLE);
}

async function modifyMaskTables(db: Knex, data: Mask): Promise<void> {
    await modifyTable(db, data, MASK_TABLE);
}

async function modifyProjectTables(db: Knex, data: Projects): Promise<void> {
    await modifyTable(db, data, PROJECT_TABLE);
}

async function modifyClassTables(db: Knex, data: Classes): Promise<void> {
    await modifyTable(db, data, CLASS_TABLE);
}

async function modifyTable(db: Knex, data: Projects | Data | Classes | Annotation | Bbox | Mask, tableName: string): Promise<void> {
    const existingData = await db(tableName).where({ id: data.id }).update(data);
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