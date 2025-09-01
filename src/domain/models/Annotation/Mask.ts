import tuple from '@arc/dtos/tuple';
import maskInterface from '@arc/dtos/Annotation/Mask';

export default class Mask implements maskInterface {
    private id: number; // mask id
    public annotation_id: number;
    public mask: Array<tuple>;

    constructor(id: number, annotation_id: number, mask: Array<tuple>) {
        this.id = id;
        this.annotation_id = annotation_id;
        this.mask = mask;
    }
    
    // this are getters and setters for the camel case variables that are in snake case in the database
    set annotationId(id: number) {
        this.annotation_id = id;
    }
    get annotationId(): number {
        return this.annotation_id;
    }
    
    public getId(): number {
        return this.id;
    }
};