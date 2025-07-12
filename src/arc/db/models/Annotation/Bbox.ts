import { Data } from '../Data';
import Annotation from "./Annotation";

class BBox extends Annotation {
    private x_min: number; // left coordinate of the bounding box
    private y_min: number; // top coordinate of the bounding box
    private x_max: number; // width of the bounding box
    private y_max: number; // height of the bounding box

    constructor(annotation_id:number, data_id:Data,
        x_min:number, y_min:number, x_max:number, y_max:number) {
        super(annotation_id,data_id);
        this.x_min = x_min;
        this.y_min = y_min;
        this.x_max = x_max;
        this.y_max = y_max;
    }
}

class BBoxWithCaption extends BBox {
    private data: string = '';

    constructor(annotation_id:number, data_id:Data,
        x_min:number, y_min:number, x_max:number, y_max:number, data:string) {
        super(annotation_id,data_id,x_min,y_min,x_max,y_max);
        this.data = data;
    }
}

export default {BBox, BBoxWithCaption};