import tuple from '../tuple';

export default interface Mask {
    id: number; // mask id
    annotation_id: number;
    mask: Array<tuple>;
};