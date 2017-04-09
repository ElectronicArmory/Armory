const enum ResourceType {
    'VIDEO',
    'IMAGE',
    'TUTORIAL',
    'PAGE',
    'PARTIAL',
    'TOOL'
};
export class Resource {
    constructor(
        public id?: number,
        public resourceName?: string,
        public resourceDescription?: string,
        public resourceURL?: string,
        public resourcePreviewImage?: string,
        public resourceType?: ResourceType,
        public weight?: number,
        public disciplineId?: number,
        public programId?: number,
        public courseId?: number,
        public lessonId?: number,
    ) { }
}
