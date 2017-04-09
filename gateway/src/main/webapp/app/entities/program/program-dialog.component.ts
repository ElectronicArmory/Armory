import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { EventManager, AlertService, JhiLanguageService } from 'ng-jhipster';

import { Program } from './program.model';
import { ProgramPopupService } from './program-popup.service';
import { ProgramService } from './program.service';
import { Resource, ResourceService } from '../resource';
import { Course, CourseService } from '../course';
import { Discipline, DisciplineService } from '../discipline';
@Component({
    selector: 'jhi-program-dialog',
    templateUrl: './program-dialog.component.html'
})
export class ProgramDialogComponent implements OnInit {

    program: Program;
    authorities: any[];
    isSaving: boolean;

    resources: Resource[];

    courses: Course[];

    disciplines: Discipline[];
    constructor(
        public activeModal: NgbActiveModal,
        private jhiLanguageService: JhiLanguageService,
        private alertService: AlertService,
        private programService: ProgramService,
        private resourceService: ResourceService,
        private courseService: CourseService,
        private disciplineService: DisciplineService,
        private eventManager: EventManager
    ) {
        this.jhiLanguageService.setLocations(['program']);
    }

    ngOnInit() {
        this.isSaving = false;
        this.authorities = ['ROLE_USER', 'ROLE_ADMIN'];
        this.resourceService.query().subscribe(
            (res: Response) => { this.resources = res.json(); }, (res: Response) => this.onError(res.json()));
        this.courseService.query().subscribe(
            (res: Response) => { this.courses = res.json(); }, (res: Response) => this.onError(res.json()));
        this.disciplineService.query().subscribe(
            (res: Response) => { this.disciplines = res.json(); }, (res: Response) => this.onError(res.json()));
    }
    clear () {
        this.activeModal.dismiss('cancel');
    }

    save () {
        this.isSaving = true;
        if (this.program.id !== undefined) {
            this.programService.update(this.program)
                .subscribe((res: Program) => this.onSaveSuccess(res), (res: Response) => this.onSaveError(res.json()));
        } else {
            this.programService.create(this.program)
                .subscribe((res: Program) => this.onSaveSuccess(res), (res: Response) => this.onSaveError(res.json()));
        }
    }

    private onSaveSuccess (result: Program) {
        this.eventManager.broadcast({ name: 'programListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError (error) {
        this.isSaving = false;
        this.onError(error);
    }

    private onError (error) {
        this.alertService.error(error.message, null, null);
    }

    trackResourceById(index: number, item: Resource) {
        return item.id;
    }

    trackCourseById(index: number, item: Course) {
        return item.id;
    }

    trackDisciplineById(index: number, item: Discipline) {
        return item.id;
    }

    getSelected(selectedVals: Array<any>, option: any) {
        if (selectedVals) {
            for (let i = 0; i < selectedVals.length; i++) {
                if (option.id === selectedVals[i].id) {
                    return selectedVals[i];
                }
            }
        }
        return option;
    }
}

@Component({
    selector: 'jhi-program-popup',
    template: ''
})
export class ProgramPopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor (
        private route: ActivatedRoute,
        private programPopupService: ProgramPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            if ( params['id'] ) {
                this.modalRef = this.programPopupService
                    .open(ProgramDialogComponent, params['id']);
            } else {
                this.modalRef = this.programPopupService
                    .open(ProgramDialogComponent);
            }

        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
