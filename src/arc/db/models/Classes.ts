import Project from "./Projects";
import { NULL_ID, NULL_STRING } from "../../../const/arc";

export default class Classes {
    private class_id: number = NULL_ID; // Class id
    private name: string = NULL_STRING; // class name
    private description: string = NULL_STRING; // class description
    private project_id: Project; // project that the class belongs to
    private r: number; // red
    private g: number; // green
    private b: number; // blue

    constructor(class_id:number, name:string, description:string, 
        project_id:Project, r:number, g:number, b:number) { 
            this.class_id = class_id;
            this.name = name;
            this.description = description;
            this.project_id = project_id;
            this.r = r;
            this.g = g;
            this.b = b;
        }
}