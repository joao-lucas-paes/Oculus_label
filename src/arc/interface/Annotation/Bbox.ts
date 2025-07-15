export default interface BBox {
    annotation_id: number; // annotation id 
    x_min: number; // left coordinate of the bounding box
    y_min: number; // top coordinate of the bounding box
    x_max: number; // width of the bounding box
    y_max: number; // height of the bounding box
}
