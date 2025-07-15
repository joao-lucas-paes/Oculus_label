export default interface Annotation {
    annotation_id: number; // annotation id
    data_id: number; // data that the annotation belongs to
    class_id: number; // class id of the annotation
    caption: string; // caption of the annotation
}