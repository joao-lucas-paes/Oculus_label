import { Data } from '../Data';
import { NULL_ID, NULL_STRING } from "../../../../const/arc";
import Classes from '../Classes';

export default class Annotation {
    private annotation_id: number = NULL_ID; // annotation id
    private data_id: Data; // data that the annotation belongs to
    private class_id: Classes; // class id of the annotation
    private caption: string = NULL_STRING; // caption of the annotation

    constructor(annotation_id:number, data_id:Data, class_id:Classes, caption:string=NULL_STRING) {
        this.annotation_id = annotation_id;
        this.data_id = data_id;
        this.class_id = class_id;
        this.caption = caption;
    }
}