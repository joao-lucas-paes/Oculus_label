import Project from './Projects';

interface Data {
    data_id: number; // data id
    name: string; // file name
    is_video: boolean ; // is video or not
    project: Project; // project that the data belongs to
}