export default class Projects {
    private Project_id: number = -1; // Project id
    private root_path: string = ''; // path to project
    public desc!: string; // project description

    constructor(Project_id:number, root_path:string, desc:string) {
        this.Project_id = Project_id;
        this.root_path = root_path;
        this.desc = desc;
    }

    setRoot_path(root_path: string): void {
        this.root_path = root_path;
    }
    getRoot_path(): string{
        return this.root_path;
    }
    getDesc(): string{
        return this.desc;
    }
}