import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ArmorySharedModule } from '../../shared';

import {
    DisciplineService,
    DisciplinePopupService,
    DisciplineComponent,
    DisciplineDetailComponent,
    DisciplineDialogComponent,
    DisciplinePopupComponent,
    DisciplineDeletePopupComponent,
    DisciplineDeleteDialogComponent,
    disciplineRoute,
    disciplinePopupRoute,
} from './';

let ENTITY_STATES = [
    ...disciplineRoute,
    ...disciplinePopupRoute,
];

@NgModule({
    imports: [
        ArmorySharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        DisciplineComponent,
        DisciplineDetailComponent,
        DisciplineDialogComponent,
        DisciplineDeleteDialogComponent,
        DisciplinePopupComponent,
        DisciplineDeletePopupComponent,
    ],
    entryComponents: [
        DisciplineComponent,
        DisciplineDialogComponent,
        DisciplinePopupComponent,
        DisciplineDeleteDialogComponent,
        DisciplineDeletePopupComponent,
    ],
    providers: [
        DisciplineService,
        DisciplinePopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ArmoryDisciplineModule {}
