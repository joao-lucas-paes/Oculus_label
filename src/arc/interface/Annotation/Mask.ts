import tuple from '../tuple';

export default interface Mask {
    annotation_id: number;
    mask: Array<tuple>;
};