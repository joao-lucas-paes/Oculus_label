import tuple from '@arc/dtos/tuple';

export default interface Mask {
    annotation_id: number;
    mask: Array<tuple>;
};