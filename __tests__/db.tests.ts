import { createDBConnection, closeDBConnection } from "../src/arc/db/config";
import { createSchema } from '../src/arc/db/schema';
import { insertClasses, insertData, insertAnnotations, insertBoundingBoxes, insertMasks, insertProjects } from "../src/arc/db/insert";
import { findAnnotationsByDataId, findClassesByProjectId, findDataAnnotationByAnnotationId, findDataByProjectId, getProjects } from "../src/arc/db/query";
import { modifyDataTables, modifyAnnotationTables, modifyBoundingBoxTables, modifyMaskTables, modifyProjectTables, modifyClassTables } from "../src/arc/db/modify";
import { deleteDataTables, deleteAnnotationTables, deleteBoundingBoxTables, deleteMaskTables, deleteProjectTables, deleteClassTables } from "../src/arc/db/delete";


import deepClone from 'lodash.clonedeep';
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
import sampleClasses from "./sample_data/classes";
import sampleData from "./sample_data/data";
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

    test("Insert and Query Projects", async () => {
        // First we insert the projects
        await insertProjects(db, sampleProjects);
        // Now we query the projects
        const insertedProjects = await getProjects(db);
        // We need to convert the Projects class instances to ProjectsInterface for comparison
        const insertedProjectsInInterfaceFormat = insertedProjects.map((project) => {
            return {
                description:project.description, 
                name:project.name, 
                root_path:project.root_path
            } as ProjectsInterface;
        });

        // Now we can compare the inserted projects with the sample projects
        expect(insertedProjectsInInterfaceFormat).toEqual(sampleProjects);
    })

    test("Insert and Modify Projects", async () => {
        const modifiedSampleProjects = new Projects(1, "SomeProjectModified", "Some description Modified", "./SomeRandomPathModified");
        // First we insert the projects
        await insertProjects(db, sampleProjects);
        // Now we modify the projects
        await modifyProjectTables(db, modifiedSampleProjects);

        // Now we query the projects
        const insertedProjects = await getProjects(db);

        // Now we can compare the inserted projects with the sample projects
        expect(insertedProjects).toContainEqual(modifiedSampleProjects);
    })

    test("Insert and Delete Projects", async () => {
        // First we insert the projects
        await insertProjects(db, sampleProjects);

        // Now we query the projects
        const insertedProjects = await getProjects(db);

        // Now we delete one project
        const removedProject = deepClone(insertedProjects[0]);
        await deleteProjectTables(db, insertedProjects[0]);

        // Now we can compare the inserted projects with the sample projects
        expect(await getProjects(db)).not.toContainEqual(removedProject);
    })

    test("Insert and Query by ProjectId - Classes", async () => {
        // First we need to insert a project to have a valid foreign key for classes
        await insertProjects(db, sampleProjects);
        const projects = await getProjects(db);

        // Now we can insert classes
        await insertClasses(db, sampleClasses);
        const projectId = projects[0].getId();

        // Query classes by project id
        const classesByProjectId = await findClassesByProjectId(db, projectId);
        const classesByProjectIdInInterfaceFormat = classesByProjectId.map((cls) => {
            return {
                class_id: cls.classId,
                project_id: cls.projectId,
                name: cls.name,
                description: cls.description,
                r: cls.RGB[0],
                g: cls.RGB[1],
                b: cls.RGB[2]
            } as ClassesInterface;
        });

        // Now we filter the sample classes to only those that belong to the inserted project
        expect(classesByProjectIdInInterfaceFormat).toEqual(sampleClasses.filter((cls) => cls.project_id === projectId));
    });

    test("Insert and Modify Classes", async () => {
        const modifiedClasses = new Classes(1, 99, 1, "SomeClassModified", "Some description Modified", 123, 123, 123);
        // First we need to insert a project to have a valid foreign key for classes
        await insertProjects(db, sampleProjects);
        const projects = await getProjects(db);

        // Now we can insert classes
        await insertClasses(db, sampleClasses);

        await modifyClassTables(db, modifiedClasses);

        expect(await findClassesByProjectId(db, 1)).toContainEqual(modifiedClasses);
    });

    test("Insert and Delete Classes", async () => {
        // First we need to insert a project to have a valid foreign key for classes
        await insertProjects(db, sampleProjects);
        const projects = await getProjects(db);

        // Now we can insert classes
        await insertClasses(db, sampleClasses);
        const classes = await findClassesByProjectId(db, projects[0].getId());
        
        const deletedClasses = deepClone(classes[0]);
        await deleteClassTables(db, classes[0]);

        expect(await findClassesByProjectId(db, deletedClasses.project_id)).not.toContainEqual(deletedClasses);
    });

    test("Testing Classes conflict", async () => {
        const spy = jest.spyOn(console, "error").mockImplementation(() => {}); // to suppress console.error output during test
        // First we need to insert a project to have a valid foreign key for classes
        // Then we insert classes with conflicting class_id within the same project
        // We expect the insertion to fail due to the unique constraint on (class_id, project_id)
        await insertProjects(db, sampleProjects);
        await expect(insertClasses(db, sampleClasses.map((cls) => {
            return {
                ...cls,
                class_id: 0 // setting all class_id to 0 to create a conflict
            } as ClassesInterface;
        }))).rejects.toMatchObject({ code: "SQLITE_CONSTRAINT_UNIQUE" });
        spy.mockRestore(); // restore console.error after test
    });

    test("Testing Foreign Key conflict in Classes", async () => {
        const spy = jest.spyOn(console, "error").mockImplementation(() => {}); // to suppress console.error output during test
        // First we try to insert classes without inserting a project first
        // We expect the insertion to fail due to foreign key constraint
        await expect(insertClasses(db, sampleClasses)).rejects.toMatchObject({ code: "SQLITE_CONSTRAINT_FOREIGNKEY" });
        spy.mockRestore(); // restore console.error after test
    });
    
    test("Insert and Query by ProjectId - Data", async () => {
        // First we need to insert a project to have a valid foreign key for classes
        await insertProjects(db, sampleProjects);
        // Now we can insert data
        await insertData(db, sampleData);

        // We will test for all project ids in the sample data
        const projectIds = Array.from(new Set(sampleData.map(d => d.project_id)));
        const promises = projectIds.map(async projectId => {
            const dataByProjectId = await findDataByProjectId(db, projectId);
            const expected = sampleData.filter(d => d.project_id === projectId);
            return {
                got: dataByProjectId.map(d => ({ name: d.name, frame_index: d.frameIndex, project_id: d.projectId })),
                expected
            };
        });

        const results = await Promise.all(promises);
        results.forEach(({ got, expected }) => expect(got).toEqual(expected));
    });

    test("Insert and Modify Data", async () => {
        // First we need to insert a project to have a valid foreign key for classes
        await insertProjects(db, sampleProjects);
        // Now we can insert data
        await insertData(db, sampleData);

        // We will modify the first data entry for testing
        const dataByProjectId = await findDataByProjectId(db, sampleData[0].project_id);
        // Modify the data
        // for this teste, the new value will be the old value + value, because frame_index is integer and the value can coincide with the original value
        // for name, we will just append a string to the original name
        dataByProjectId[0].name = "SomeDataModified_" + dataByProjectId[0].name;
        dataByProjectId[0].frameIndex = dataByProjectId[0].frameIndex + 1;
        const dataOriginal = deepClone(dataByProjectId[0]);

        await modifyDataTables(db, dataByProjectId[0]);
        expect(await findDataByProjectId(db, dataOriginal.projectId)).toContainEqual(dataOriginal);        
    });

    test("Insert and Delete Data", async () => {
        // First we need to insert a project to have a valid foreign key for classes
        await insertProjects(db, sampleProjects);
        // Now we can insert data
        await insertData(db, sampleData);

        // We will modify the first data entry for testing
        const dataByProjectId = await findDataByProjectId(db, sampleData[0].project_id);
        const dataOriginal = deepClone(dataByProjectId[0]);
        
        // Now we delete the data
        await deleteDataTables(db, dataByProjectId[0]);
        expect(await findDataByProjectId(db, dataOriginal.projectId)).not.toContainEqual(dataOriginal);        
    });
})
