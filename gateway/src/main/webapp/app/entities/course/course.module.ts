import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ArmorySharedModule } from '../../shared';

import {
    CourseService,
    CoursePopupService,
    CourseComponent,
    CourseDetailComponent,
    CourseDialogComponent,
    CoursePopupComponent,
    CourseDeletePopupComponent,
    CourseDeleteDialogComponent,
    courseRoute,
    coursePopupRoute,
    CourseResolvePagingParams,
} from './';

let ENTITY_STATES = [
    ...courseRoute,
    ...coursePopupRoute,
];

@NgModule({
    imports: [
        ArmorySharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        CourseComponent,
        CourseDetailComponent,
        CourseDialogComponent,
        CourseDeleteDialogComponent,
        CoursePopupComponent,
        CourseDeletePopupComponent,
    ],
    entryComponents: [
        CourseComponent,
        CourseDialogComponent,
        CoursePopupComponent,
        CourseDeleteDialogComponent,
        CourseDeletePopupComponent,
    ],
    providers: [
        CourseService,
        CoursePopupService,
        CourseResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ArmoryCourseModule {}
