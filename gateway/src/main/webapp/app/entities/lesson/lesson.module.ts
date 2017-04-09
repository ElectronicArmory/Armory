import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ArmorySharedModule } from '../../shared';

import {
    LessonService,
    LessonPopupService,
    LessonComponent,
    LessonDetailComponent,
    LessonDialogComponent,
    LessonPopupComponent,
    LessonDeletePopupComponent,
    LessonDeleteDialogComponent,
    lessonRoute,
    lessonPopupRoute,
} from './';

let ENTITY_STATES = [
    ...lessonRoute,
    ...lessonPopupRoute,
];

@NgModule({
    imports: [
        ArmorySharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        LessonComponent,
        LessonDetailComponent,
        LessonDialogComponent,
        LessonDeleteDialogComponent,
        LessonPopupComponent,
        LessonDeletePopupComponent,
    ],
    entryComponents: [
        LessonComponent,
        LessonDialogComponent,
        LessonPopupComponent,
        LessonDeleteDialogComponent,
        LessonDeletePopupComponent,
    ],
    providers: [
        LessonService,
        LessonPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ArmoryLessonModule {}
