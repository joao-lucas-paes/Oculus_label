import { Data } from '../Data';
import Annotation from "./Annotation";

export default class Caption extends Annotation {
    private data: string = '';

    constructor(annotation_id:number, data_id:Data, data:string) {
        super(annotation_id,data_id);
        this.data = data;
    }
}