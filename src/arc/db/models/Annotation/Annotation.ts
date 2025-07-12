import { Data } from '../Data';

export default class Annotation {
    private annotation_id: number = -1; // annotation id
    private data_id: Data; // data that the annotation belongs to

    constructor(annotation_id:number, data_id:Data) {
        this.annotation_id = annotation_id;
        this.data_id = data_id;
    }
}