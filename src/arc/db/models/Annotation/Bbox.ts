import Annotation from "./Annotation";

export default class BBox {
    private annotation_info: Annotation; // annotation information
    private x_min: number; // left coordinate of the bounding box
    private y_min: number; // top coordinate of the bounding box
    private x_max: number; // width of the bounding box
    private y_max: number; // height of the bounding box

    constructor(annotation:Annotation, x_min:number, y_min:number, x_max:number, y_max:number) {
        this.annotation_info = annotation;
        this.x_min = x_min;
        this.y_min = y_min;
        this.x_max = x_max;
        this.y_max = y_max;
    }
}
