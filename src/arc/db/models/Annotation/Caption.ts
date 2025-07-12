import { Data } from '../Data';
import Annotation from "./Annotation";
import { NULL_STRING } from "../../../../const/arc";

export default class Caption extends Annotation {
    private data: string = NULL_STRING;

    constructor(annotation_id:number, data_id:Data, data:string) {
        super(annotation_id,data_id);
        this.data = data;
    }
}