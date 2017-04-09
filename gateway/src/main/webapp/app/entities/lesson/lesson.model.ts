const enum Language {
    'ENGLISH',
    'SPANISH',
    'HUNGARIAN',
    'GERMAN'
};
export class Lesson {
    constructor(
        public id?: number,
        public lessonTitle?: string,
        public lessonDescription?: string,
        public language?: Language,
        public resourcesId?: number,
        public coursesId?: number,
    ) { }
}
