import Project from './Projects';

class Data {
    private data_id: number = -1; // data id
    private name: string = ''; // file name
    private is_video: boolean = false; // is video or not
    private project: Project; // project that the data belongs to


    constructor(data_id:number, name:string, project:Project, is_video:boolean=false) {
        this.data_id = data_id;
        this.name = name;
        this.project = project;
        this.is_video = is_video;
    }
    
    public get displayName() : string {
        return this.name;
    }
    
    public set displayName(name: string) {
        this.name = name;
    }

    public get isVideo() : boolean {
        return this.is_video;
    }
}

class Frame extends Data {
    private index: number = -1;
    constructor(index:number, Data_id:number, name:string, project:Project, is_video:boolean) {
        super(Data_id, name, project, is_video);
        this.index = index;
    }
    
    public get frameIndex() : number {
        return this.index;
    }
}

export {Data, Frame}