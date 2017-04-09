import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { EventManager, AlertService, JhiLanguageService } from 'ng-jhipster';

import { Resource } from './resource.model';
import { ResourcePopupService } from './resource-popup.service';
import { ResourceService } from './resource.service';
import { Discipline, DisciplineService } from '../discipline';
import { Program, ProgramService } from '../program';
import { Course, CourseService } from '../course';
import { Lesson, LessonService } from '../lesson';
@Component({
    selector: 'jhi-resource-dialog',
    templateUrl: './resource-dialog.component.html'
})
export class ResourceDialogComponent implements OnInit {

    resource: Resource;
    authorities: any[];
    isSaving: boolean;

    disciplines: Discipline[];

    programs: Program[];

    courses: Course[];

    lessons: Lesson[];
    constructor(
        public activeModal: NgbActiveModal,
        private jhiLanguageService: JhiLanguageService,
        private alertService: AlertService,
        private resourceService: ResourceService,
        private disciplineService: DisciplineService,
        private programService: ProgramService,
        private courseService: CourseService,
        private lessonService: LessonService,
        private eventManager: EventManager
    ) {
        this.jhiLanguageService.setLocations(['resource', 'resourceType']);
    }

    ngOnInit() {
        this.isSaving = false;
        this.authorities = ['ROLE_USER', 'ROLE_ADMIN'];
        this.disciplineService.query().subscribe(
            (res: Response) => { this.disciplines = res.json(); }, (res: Response) => this.onError(res.json()));
        this.programService.query().subscribe(
            (res: Response) => { this.programs = res.json(); }, (res: Response) => this.onError(res.json()));
        this.courseService.query().subscribe(
            (res: Response) => { this.courses = res.json(); }, (res: Response) => this.onError(res.json()));
        this.lessonService.query().subscribe(
            (res: Response) => { this.lessons = res.json(); }, (res: Response) => this.onError(res.json()));
    }
    clear () {
        this.activeModal.dismiss('cancel');
    }

    save () {
        this.isSaving = true;
        if (this.resource.id !== undefined) {
            this.resourceService.update(this.resource)
                .subscribe((res: Resource) => this.onSaveSuccess(res), (res: Response) => this.onSaveError(res.json()));
        } else {
            this.resourceService.create(this.resource)
                .subscribe((res: Resource) => this.onSaveSuccess(res), (res: Response) => this.onSaveError(res.json()));
        }
    }

    private onSaveSuccess (result: Resource) {
        this.eventManager.broadcast({ name: 'resourceListModification', content: 'OK'});
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

    trackDisciplineById(index: number, item: Discipline) {
        return item.id;
    }

    trackProgramById(index: number, item: Program) {
        return item.id;
    }

    trackCourseById(index: number, item: Course) {
        return item.id;
    }

    trackLessonById(index: number, item: Lesson) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-resource-popup',
    template: ''
})
export class ResourcePopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor (
        private route: ActivatedRoute,
        private resourcePopupService: ResourcePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            if ( params['id'] ) {
                this.modalRef = this.resourcePopupService
                    .open(ResourceDialogComponent, params['id']);
            } else {
                this.modalRef = this.resourcePopupService
                    .open(ResourceDialogComponent);
            }

        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
