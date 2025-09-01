import { Knex } from "knex";
import Projects from '@domain/models/Projects';
import Classes from '@domain/models/Classes';
import Data from '@domain/models/Data';
import Annotation from '@domain/models/Annotation/Annotation';
import Bbox from '@domain/models/Annotation/Bbox';
import Mask from '@domain/models/Annotation/Mask';
import { ANNOTATION_TABLE, BOUNDING_BOX_TABLE, CLASS_TABLE, DATA_TABLE, MASK_TABLE, PROJECT_TABLE } from "@const/arc";

async function deleteData(db: Knex, dataId: number, tableName: string): Promise<void> {
    const existingData = await db(tableName).where({ id: dataId }).del();
    if (!existingData) {
        throw new Error(`${tableName} with ID ${dataId} not found.`);
    }
}

async function deleteDataTables(db: Knex, data: Data): Promise<void> {
    await deleteData(db, data.getId(), DATA_TABLE);
}
async function deleteAnnotationTables(db: Knex, annotation: Annotation): Promise<void> {
    await deleteData(db, annotation.getId(), ANNOTATION_TABLE);
}
async function deleteBoundingBoxTables(db: Knex, boundingbox: Bbox): Promise<void> {
    await deleteData(db, boundingbox.getId(), BOUNDING_BOX_TABLE);
}
async function deleteMaskTables(db: Knex, mask: Mask): Promise<void> {
    await deleteData(db, mask.getId(), MASK_TABLE);
}
async function deleteProjectTables(db: Knex, project: Projects): Promise<void> {
    await deleteData(db, project.getId(), PROJECT_TABLE);
}
async function deleteClassTables(db: Knex, classes: Classes): Promise<void> {
    await deleteData(db, classes.getId(), CLASS_TABLE);
}

export {
    deleteDataTables,
    deleteAnnotationTables,
    deleteBoundingBoxTables,
    deleteMaskTables,
    deleteProjectTables,
    deleteClassTables
};