export default interface Data {
    data_id: number; // data id
    name: string; // file name
    frame_index: number; // index of the frame in a video, -1 means not a video
    project_id: Number; // project that the data belongs to
}