import Annotation from "./Annotation";
import tuple from '../../../interface/tuple';

export default class Mask  {
    private annotation_info: Annotation;
    private mask: Array<tuple> = new Array<tuple>();

    constructor(annotation:Annotation, mask:object) {
        this.annotation_info = annotation;
        this.mask = Array.from(Object.values(mask));
    }
};