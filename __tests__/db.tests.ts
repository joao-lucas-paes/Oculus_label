import { createDBConnection, closeDBConnection } from "../src/arc/db/config";
import { createSchema } from '../src/arc/db/schema';
import { insertClasses, insertData, insertAnnotations, insertBoundingBoxes, insertMasks, insertProjects } from "../src/arc/db/insert";
import { findAnnotationsByDataId, findClassesByProjectId, findDataAnnotationByAnnotationId, findDataByProjectId, getProjects } from "../src/arc/db/query";
import { modifyDataTables, modifyAnnotationTables, modifyBoundingBoxTables, modifyMaskTables, modifyProjectTables, modifyClassTables } from "../src/arc/db/modify";
import { deleteDataTables, deleteAnnotationTables, deleteBoundingBoxTables, deleteMaskTables, deleteProjectTables, deleteClassTables } from "../src/arc/db/delete";
import { describe, beforeEach, afterEach, test } from "node:test";
import { Knex } from "knex";
import fs from "fs";
import { error } from "console";

// types import 
import Projects from '../src/arc/models/Projects';
import Classes from '../src/arc/models/Classes';
import Data from '../src/arc/models/Data';
import Annotation from '../src/arc/models/Annotation/Annotation';
import Bbox from '../src/arc/models/Annotation/Bbox';
import Mask from '../src/arc/models/Annotation/Mask';
import ProjectsInterface from '../src/arc/interface/Projects';
import ClassesInterface from '../src/arc/interface/Classes';
import DataInterface from '../src/arc/interface/Data';
import AnnotationInterface from '../src/arc/interface/Annotation/Annotation';
import BboxInterface from '../src/arc/interface/Annotation/Bbox';
import MaskInterface from '../src/arc/interface/Annotation/Mask';

// import the json files with sample data
import sampleProjects from "./sample_data/projects";
import { DB_DRIVER } from "../src/const/arc";

const PATH_DB_TEST = "./test.tmp.db";

describe("Database Operations: ", () => {
    let db: Knex; // the variable to hold the database connection

    beforeEach(async () => {
        db = await createDBConnection(DB_DRIVER, PATH_DB_TEST); // the database connection
        // Here we would normally set up the database schema for testing
        // We are creating a fresh database file for each test
        // And we are creating the schema tables
        await createSchema(db);
    });

    afterEach(async () => {
        await closeDBConnection(db); // close the database connection after each test
        try {
            await fs.unlink(PATH_DB_TEST, (err)=>{ // delete the test database file
                if(!err) return; // if there is no error, return

                if (err.code === "ENOENT") { // if the file does not exist, log it
                    console.log("DB file was not find in path:", PATH_DB_TEST);
                } else { // for other errors, throw it
                    throw err;
                }
            });
        } catch (err) { // catch any error that occurs during file deletion
            throw error("Something went wrong in the deletion of the test database file:", err);            
        }
    });

    // ### INSERTION TESTS ###
    test("Insert and Query Projects", async () => {
        await insertProjects(db, sampleProjects);
        const insertedProjects = await getProjects(db);
        const insertedProjectsInInterfaceFormat = insertedProjects.map((project) => {
            return {
                description:project.description, 
                name:project.name, 
                root_path:project.root_path
            } as ProjectsInterface
        });

        expect(insertedProjectsInInterfaceFormat).toEqual(sampleProjects);
        
    })
})
