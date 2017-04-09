import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { EventManager, JhiLanguageService } from 'ng-jhipster';

import { Discipline } from './discipline.model';
import { DisciplinePopupService } from './discipline-popup.service';
import { DisciplineService } from './discipline.service';

@Component({
    selector: 'jhi-discipline-delete-dialog',
    templateUrl: './discipline-delete-dialog.component.html'
})
export class DisciplineDeleteDialogComponent {

    discipline: Discipline;

    constructor(
        private jhiLanguageService: JhiLanguageService,
        private disciplineService: DisciplineService,
        public activeModal: NgbActiveModal,
        private eventManager: EventManager
    ) {
        this.jhiLanguageService.setLocations(['discipline']);
    }

    clear () {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete (id: number) {
        this.disciplineService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'disciplineListModification',
                content: 'Deleted an discipline'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-discipline-delete-popup',
    template: ''
})
export class DisciplineDeletePopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor (
        private route: ActivatedRoute,
        private disciplinePopupService: DisciplinePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            this.modalRef = this.disciplinePopupService
                .open(DisciplineDeleteDialogComponent, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
