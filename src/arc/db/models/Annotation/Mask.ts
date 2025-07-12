import { Data } from '../Data';
import Annotation from "./Annotation";
import { NULL_STRING } from "../../../../const/arc";
import tuple from '../../../interface/tuple';

class Mask extends Annotation {
    private mask: Array<tuple> = new Array<tuple>();

    constructor(annotation_id:number, data_id:Data, mask:object) {
        super(annotation_id,data_id);
        this.mask = Array.from(Object.values(mask));
    }
}

class MaskWithCaption extends Mask {
    private data: string = NULL_STRING;

    constructor(annotation_id:number, data_id:Data, mask:object, data:string) {
        super(annotation_id, data_id, mask);
        this.data = data;
    }
}

export default {Mask, MaskWithCaption};