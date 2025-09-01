import ClassesInterfaces from "@arc/dtos/Classes";

export default class Classes implements ClassesInterfaces {
    private id: number; // table id
    public class_id: number; // class id
    public project_id: number; // id project that the class belongs to
    public name: string; // class name
    public description: string; // class description
    public r: number; // red
    public g: number; // green
    public b: number; // blue

    constructor(id: number, class_id: number, project_id: number, name: string, description: string, r: number, g: number, b: number) {
        this.id = id;
        this.class_id = class_id;
        this.project_id = project_id;
        this.name = name;
        this.description = description;
        this.r = r;
        this.g = g;
        this.b = b;
    }

    // this are getters and setters for the camel case variables that are in snake case in the database
    set classId(id: number) {
        this.class_id = id;
    }
    get classId(): number {
        return this.class_id;
    }
    set projectId(id: number) {
        this.project_id = id;
    }
    get projectId(): number {
        return this.project_id;
    }

    get RGB(): [number, number, number] {
        return [this.r, this.g, this.b];
    }
    set RGB(color: [number, number, number]) {
        this.r = color[0];
        this.g = color[1];
        this.b = color[2];
    }

    public getId() {
        return this.id;
    }
}