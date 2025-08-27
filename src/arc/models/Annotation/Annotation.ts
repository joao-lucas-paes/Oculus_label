import AnnotationInterface from "../../interface/Annotation/Annotation";

export default class Annotation implements AnnotationInterface {
    private id: number; // annotation id
    public data_id: number; // data that the annotation belongs to
    public class_id: number; // class id of the annotation
    public caption: string; // caption of the annotation

    constructor(id: number, data_id: number, class_id: number, caption: string) {
        this.id = id;
        this.data_id = data_id;
        this.class_id = class_id;
        this.caption = caption;
    }

    // this are getters and setters for the camel case variables that are in snake case in the database
    set dataId(id: number) {
        this.data_id = id;
    }
    get dataId(): number {
        return this.data_id;
    }
    set classId(id: number) {
        this.class_id = id;
    }
    get classId(): number {
        return this.class_id;
    }

    public getId() {
        return this.id;
    }
}