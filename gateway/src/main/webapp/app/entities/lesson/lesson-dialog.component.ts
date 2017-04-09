import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { EventManager, AlertService, JhiLanguageService } from 'ng-jhipster';

import { Lesson } from './lesson.model';
import { LessonPopupService } from './lesson-popup.service';
import { LessonService } from './lesson.service';
import { Resource, ResourceService } from '../resource';
import { Course, CourseService } from '../course';
@Component({
    selector: 'jhi-lesson-dialog',
    templateUrl: './lesson-dialog.component.html'
})
export class LessonDialogComponent implements OnInit {

    lesson: Lesson;
    authorities: any[];
    isSaving: boolean;

    resources: Resource[];

    courses: Course[];
    constructor(
        public activeModal: NgbActiveModal,
        private jhiLanguageService: JhiLanguageService,
        private alertService: AlertService,
        private lessonService: LessonService,
        private resourceService: ResourceService,
        private courseService: CourseService,
        private eventManager: EventManager
    ) {
        this.jhiLanguageService.setLocations(['lesson', 'language']);
    }

    ngOnInit() {
        this.isSaving = false;
        this.authorities = ['ROLE_USER', 'ROLE_ADMIN'];
        this.resourceService.query().subscribe(
            (res: Response) => { this.resources = res.json(); }, (res: Response) => this.onError(res.json()));
        this.courseService.query().subscribe(
            (res: Response) => { this.courses = res.json(); }, (res: Response) => this.onError(res.json()));
    }
    clear () {
        this.activeModal.dismiss('cancel');
    }

    save () {
        this.isSaving = true;
        if (this.lesson.id !== undefined) {
            this.lessonService.update(this.lesson)
                .subscribe((res: Lesson) => this.onSaveSuccess(res), (res: Response) => this.onSaveError(res.json()));
        } else {
            this.lessonService.create(this.lesson)
                .subscribe((res: Lesson) => this.onSaveSuccess(res), (res: Response) => this.onSaveError(res.json()));
        }
    }

    private onSaveSuccess (result: Lesson) {
        this.eventManager.broadcast({ name: 'lessonListModification', content: 'OK'});
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
    selector: 'jhi-lesson-popup',
    template: ''
})
export class LessonPopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor (
        private route: ActivatedRoute,
        private lessonPopupService: LessonPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            if ( params['id'] ) {
                this.modalRef = this.lessonPopupService
                    .open(LessonDialogComponent, params['id']);
            } else {
                this.modalRef = this.lessonPopupService
                    .open(LessonDialogComponent);
            }

        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
