const enum Level {
    'NOVICE',
    'BEGINNER',
    'INTERMEDIATE',
    'ADVANCED',
    'PROFESSIONAL'
};
export class Course {
    constructor(
        public id?: number,
        public courseTitle?: string,
        public courseDescription?: string,
        public coursePrice?: number,
        public courseLevel?: Level,
        public resourcesId?: number,
        public lessonsId?: number,
        public programsId?: number,
    ) { }
}
