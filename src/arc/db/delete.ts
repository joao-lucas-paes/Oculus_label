import {Knex} from "knex";
import Projects from '../interface/Projects';
import Classes from '../interface/Classes';
import Data from '../interface/Data';
import Annotation from '../interface/Annotation/Annotation';
import Bbox from '../interface/Annotation/Bbox';
import Mask from '../interface/Annotation/Mask';
import { ANNOTATION_TABLE, BOUNDING_BOX_TABLE, CLASS_TABLE, DATA_TABLE, MASK_TABLE, PROJECT_TABLE } from "../../const/arc";

async function deleteData(db: Knex, dataId: number, tableName: string): Promise<void> {
    const existingData = await db(tableName).where({ id: dataId }).del();
    if (!existingData) {
        throw new Error(`${tableName} with ID ${dataId} not found.`);
    }
}

async function deleteDataTables(db: Knex, data: Data): Promise<void> {
    await deleteData(db, data.id, DATA_TABLE);
}
async function deleteAnnotationTables(db: Knex, annotation: Annotation): Promise<void> {
    await deleteData(db, annotation.id, ANNOTATION_TABLE);
}
async function deleteBoundingBoxTables(db: Knex, boundingbox: Bbox): Promise<void> {
    await deleteData(db, boundingbox.id, BOUNDING_BOX_TABLE);
}
async function deleteMaskTables(db: Knex, mask: Mask): Promise<void> {
    await deleteData(db, mask.id, MASK_TABLE);
}
async function deleteProjectTables(db: Knex, project: Projects): Promise<void> {
    await deleteData(db, project.id, PROJECT_TABLE);
}
async function deleteClassTables(db: Knex, classes: Classes): Promise<void> {
    await deleteData(db, classes.id, CLASS_TABLE);
}

export default {
    deleteDataTables,
    deleteAnnotationTables,
    deleteBoundingBoxTables,
    deleteMaskTables,
    deleteProjectTables,
    deleteClassTables
};