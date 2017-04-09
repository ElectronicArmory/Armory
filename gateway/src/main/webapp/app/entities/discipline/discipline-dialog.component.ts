import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { EventManager, AlertService, JhiLanguageService } from 'ng-jhipster';

import { Discipline } from './discipline.model';
import { DisciplinePopupService } from './discipline-popup.service';
import { DisciplineService } from './discipline.service';
import { Resource, ResourceService } from '../resource';
import { Program, ProgramService } from '../program';
@Component({
    selector: 'jhi-discipline-dialog',
    templateUrl: './discipline-dialog.component.html'
})
export class DisciplineDialogComponent implements OnInit {

    discipline: Discipline;
    authorities: any[];
    isSaving: boolean;

    resources: Resource[];

    programs: Program[];
    constructor(
        public activeModal: NgbActiveModal,
        private jhiLanguageService: JhiLanguageService,
        private alertService: AlertService,
        private disciplineService: DisciplineService,
        private resourceService: ResourceService,
        private programService: ProgramService,
        private eventManager: EventManager
    ) {
        this.jhiLanguageService.setLocations(['discipline']);
    }

    ngOnInit() {
        this.isSaving = false;
        this.authorities = ['ROLE_USER', 'ROLE_ADMIN'];
        this.resourceService.query().subscribe(
            (res: Response) => { this.resources = res.json(); }, (res: Response) => this.onError(res.json()));
        this.programService.query().subscribe(
            (res: Response) => { this.programs = res.json(); }, (res: Response) => this.onError(res.json()));
    }
    clear () {
        this.activeModal.dismiss('cancel');
    }

    save () {
        this.isSaving = true;
        if (this.discipline.id !== undefined) {
            this.disciplineService.update(this.discipline)
                .subscribe((res: Discipline) => this.onSaveSuccess(res), (res: Response) => this.onSaveError(res.json()));
        } else {
            this.disciplineService.create(this.discipline)
                .subscribe((res: Discipline) => this.onSaveSuccess(res), (res: Response) => this.onSaveError(res.json()));
        }
    }

    private onSaveSuccess (result: Discipline) {
        this.eventManager.broadcast({ name: 'disciplineListModification', content: 'OK'});
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
    selector: 'jhi-discipline-popup',
    template: ''
})
export class DisciplinePopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor (
        private route: ActivatedRoute,
        private disciplinePopupService: DisciplinePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            if ( params['id'] ) {
                this.modalRef = this.disciplinePopupService
                    .open(DisciplineDialogComponent, params['id']);
            } else {
                this.modalRef = this.disciplinePopupService
                    .open(DisciplineDialogComponent);
            }

        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
