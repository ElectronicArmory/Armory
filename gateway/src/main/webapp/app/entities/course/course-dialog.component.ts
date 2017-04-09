import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { EventManager, AlertService, JhiLanguageService } from 'ng-jhipster';

import { Course } from './course.model';
import { CoursePopupService } from './course-popup.service';
import { CourseService } from './course.service';
import { Resource, ResourceService } from '../resource';
import { Lesson, LessonService } from '../lesson';
import { Program, ProgramService } from '../program';
@Component({
    selector: 'jhi-course-dialog',
    templateUrl: './course-dialog.component.html'
})
export class CourseDialogComponent implements OnInit {

    course: Course;
    authorities: any[];
    isSaving: boolean;

    resources: Resource[];

    lessons: Lesson[];

    programs: Program[];
    constructor(
        public activeModal: NgbActiveModal,
        private jhiLanguageService: JhiLanguageService,
        private alertService: AlertService,
        private courseService: CourseService,
        private resourceService: ResourceService,
        private lessonService: LessonService,
        private programService: ProgramService,
        private eventManager: EventManager
    ) {
        this.jhiLanguageService.setLocations(['course', 'level']);
    }

    ngOnInit() {
        this.isSaving = false;
        this.authorities = ['ROLE_USER', 'ROLE_ADMIN'];
        this.resourceService.query().subscribe(
            (res: Response) => { this.resources = res.json(); }, (res: Response) => this.onError(res.json()));
        this.lessonService.query().subscribe(
            (res: Response) => { this.lessons = res.json(); }, (res: Response) => this.onError(res.json()));
        this.programService.query().subscribe(
            (res: Response) => { this.programs = res.json(); }, (res: Response) => this.onError(res.json()));
    }
    clear () {
        this.activeModal.dismiss('cancel');
    }

    save () {
        this.isSaving = true;
        if (this.course.id !== undefined) {
            this.courseService.update(this.course)
                .subscribe((res: Course) => this.onSaveSuccess(res), (res: Response) => this.onSaveError(res.json()));
        } else {
            this.courseService.create(this.course)
                .subscribe((res: Course) => this.onSaveSuccess(res), (res: Response) => this.onSaveError(res.json()));
        }
    }

    private onSaveSuccess (result: Course) {
        this.eventManager.broadcast({ name: 'courseListModification', content: 'OK'});
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

    trackLessonById(index: number, item: Lesson) {
        return item.id;
    }

    trackProgramById(index: number, item: Program) {
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
    selector: 'jhi-course-popup',
    template: ''
})
export class CoursePopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor (
        private route: ActivatedRoute,
        private coursePopupService: CoursePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            if ( params['id'] ) {
                this.modalRef = this.coursePopupService
                    .open(CourseDialogComponent, params['id']);
            } else {
                this.modalRef = this.coursePopupService
                    .open(CourseDialogComponent);
            }

        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
