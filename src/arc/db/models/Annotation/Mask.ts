import { Data } from '../Data';
import Annotation from "./Annotation";
import { NULL_STRING } from "../../../../const/arc";
import tuple from '../../../interface/tuple';
import Classes from '../Classes';

export default class Mask extends Annotation {
    private mask: Array<tuple> = new Array<tuple>();

    constructor(annotation_id:number, data_id:Data, classes:Classes, caption:string=NULL_STRING, mask:object) {
        super(annotation_id,data_id,classes,caption);
        this.mask = Array.from(Object.values(mask));
    }
};