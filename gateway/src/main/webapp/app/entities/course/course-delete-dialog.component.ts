import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { EventManager, JhiLanguageService } from 'ng-jhipster';

import { Course } from './course.model';
import { CoursePopupService } from './course-popup.service';
import { CourseService } from './course.service';

@Component({
    selector: 'jhi-course-delete-dialog',
    templateUrl: './course-delete-dialog.component.html'
})
export class CourseDeleteDialogComponent {

    course: Course;

    constructor(
        private jhiLanguageService: JhiLanguageService,
        private courseService: CourseService,
        public activeModal: NgbActiveModal,
        private eventManager: EventManager
    ) {
        this.jhiLanguageService.setLocations(['course', 'level']);
    }

    clear () {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete (id: number) {
        this.courseService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'courseListModification',
                content: 'Deleted an course'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-course-delete-popup',
    template: ''
})
export class CourseDeletePopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor (
        private route: ActivatedRoute,
        private coursePopupService: CoursePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            this.modalRef = this.coursePopupService
                .open(CourseDeleteDialogComponent, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
