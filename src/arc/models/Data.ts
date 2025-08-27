import dataInterface from "../interface/Data";

export default class Data implements dataInterface {
    private id: number; // data id
    public name: string; // file name
    public frame_index: number; // index of the frame in a video/timeSeries, -1 means not a video
    public project_id: number; // project that the data belongs to

    constructor(id: number, name: string, frame_index: number, project_id: number) {
        this.id = id;
        this.name = name;
        this.frame_index = frame_index;
        this.project_id = project_id;
    }

    // this are getters and setters for the camel case variables that are in snake case in the database
    set frameIndex(index: number) {
        this.frame_index = index;
    }
    get frameIndex(): number {
        return this.frame_index;
    }
    set projectId(id: number) {
        this.project_id = id;
    }
    get projectId(): number {
        return this.project_id;
    }

    public getId() {
        return this.id;
    }
}