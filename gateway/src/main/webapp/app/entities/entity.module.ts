import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { ArmoryCourseModule } from './course/course.module';
import { ArmoryDisciplineModule } from './discipline/discipline.module';
import { ArmoryLessonModule } from './lesson/lesson.module';
import { ArmoryProgramModule } from './program/program.module';
import { ArmoryResourceModule } from './resource/resource.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    imports: [
        ArmoryCourseModule,
        ArmoryDisciplineModule,
        ArmoryLessonModule,
        ArmoryProgramModule,
        ArmoryResourceModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ArmoryEntityModule {}
