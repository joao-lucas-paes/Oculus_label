import BBoxInterface from "@arc/dtos/Annotation/Bbox";

export default class BBox implements BBoxInterface {
    private id: number; // bounding box id
    public annotation_id: number; // annotation id 
    public x_min: number; // left coordinate of the bounding box
    public y_min: number; // top coordinate of the bounding box
    public x_max: number; // width of the bounding box
    public y_max: number; // height of the bounding box

    constructor(id: number, annotation_id: number, x_min: number, y_min: number, x_max: number, y_max: number) {
        this.id = id;
        this.annotation_id = annotation_id;
        this.x_min = x_min;
        this.y_min = y_min;
        this.x_max = x_max;
        this.y_max = y_max;
    }

    // this are getters and setters for the camel case variables that are in snake case in the database
    set xMin(x: number) {
        this.x_min = x;
    }
    get xMin(): number {
        return this.x_min;
    }
    set yMin(y: number) {
        this.y_min = y;
    }
    get yMin(): number {
        return this.y_min;
    }
    set xMax(x: number) {
        this.x_max = x;
    }
    get xMax(): number {
        return this.x_max;
    }
    set yMax(y: number) {
        this.y_max = y;
    }
    get yMax(): number {
        return this.y_max;
    }

    public getId(): number {
        return this.id;
    }
}
