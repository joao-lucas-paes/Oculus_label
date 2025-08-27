import { Knex } from 'knex';
import Projects from '../models/Projects';
import Classes from '../models/Classes';
import Data from '../models/Data';
import Annotation from '../models/Annotation/Annotation';
import Bbox from '../models/Annotation/Bbox';
import Mask from '../models/Annotation/Mask';
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
    const existingData = await db(tableName).where({ id: data.getId() }).update(data);
    if (!existingData) {
        throw new Error(`${tableName} with ID ${data.getId()} not found.`);
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