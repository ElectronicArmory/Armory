import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { EventManager, JhiLanguageService } from 'ng-jhipster';

import { Lesson } from './lesson.model';
import { LessonPopupService } from './lesson-popup.service';
import { LessonService } from './lesson.service';

@Component({
    selector: 'jhi-lesson-delete-dialog',
    templateUrl: './lesson-delete-dialog.component.html'
})
export class LessonDeleteDialogComponent {

    lesson: Lesson;

    constructor(
        private jhiLanguageService: JhiLanguageService,
        private lessonService: LessonService,
        public activeModal: NgbActiveModal,
        private eventManager: EventManager
    ) {
        this.jhiLanguageService.setLocations(['lesson', 'language']);
    }

    clear () {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete (id: number) {
        this.lessonService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'lessonListModification',
                content: 'Deleted an lesson'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-lesson-delete-popup',
    template: ''
})
export class LessonDeletePopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor (
        private route: ActivatedRoute,
        private lessonPopupService: LessonPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            this.modalRef = this.lessonPopupService
                .open(LessonDeleteDialogComponent, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
