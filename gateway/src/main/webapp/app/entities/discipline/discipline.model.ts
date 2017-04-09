export class Discipline {
    constructor(
        public id?: number,
        public disciplineName?: string,
        public disciplineDescription?: string,
        public disciplinePrice?: number,
        public resourcesId?: number,
        public programsId?: number,
    ) { }
}
