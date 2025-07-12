import { Data } from '../Data';
import Annotation from "./Annotation";
import Classes from '../Classes';
import { NULL_STRING } from "../../../../const/arc";

class Classification extends Annotation {
    private class_ann: Classes;

    constructor(annotation_id:number, data_id:Data, class_ann:Classes) {
        super(annotation_id,data_id);
        this.class_ann = class_ann;
    }
}

class ClassificationWithCaption extends Classification {
    private data: string = NULL_STRING;

    constructor(annotation_id:number, data_id:Data, class_ann:Classes, data:string) {
        super(annotation_id, data_id, class_ann);
        this.data = data;
    }
}

export default {Classification, ClassificationWithCaption};