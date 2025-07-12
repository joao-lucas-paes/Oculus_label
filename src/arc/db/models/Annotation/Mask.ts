import { Data } from '../Data';
import Annotation from "./Annotation";

class Mask extends Annotation {
    private mask: Array<Array<number>> = new Array<Array<number>>();

    constructor(annotation_id:number, data_id:Data, mask:object) {
        super(annotation_id,data_id);
        this.mask = Array.from(Object.values(mask));
    }
}

class MaskWithCaption extends Mask {
    private data: string = '';

    constructor(annotation_id:number, data_id:Data, mask:object, data:string) {
        super(annotation_id, data_id, mask);
        this.data = data;
    }
}

export default {Mask, MaskWithCaption};