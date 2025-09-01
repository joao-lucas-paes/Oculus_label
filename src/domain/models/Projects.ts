import ProjectInterface from "@arc/dtos/Projects";

export default class Projects implements ProjectInterface {
    private id: number; // Project id
    public name: string; // Project name
    public root_path: string; // path to project
    public description: string; // project description

    constructor(id: number, name: string, root_path: string, description: string) {
        this.id = id;
        this.name = name;
        this.root_path = root_path;
        this.description = description;
    }

    // this are getters and setters for the camel case variables that are in snake case in the database
    get rootPath(): string {
        return this.root_path;
    }
    set rootPath(path: string) {
        this.root_path = path;
    }
    
    public getId() {
        return this.id;
    }
}