import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { EventManager, JhiLanguageService } from 'ng-jhipster';

import { Resource } from './resource.model';
import { ResourcePopupService } from './resource-popup.service';
import { ResourceService } from './resource.service';

@Component({
    selector: 'jhi-resource-delete-dialog',
    templateUrl: './resource-delete-dialog.component.html'
})
export class ResourceDeleteDialogComponent {

    resource: Resource;

    constructor(
        private jhiLanguageService: JhiLanguageService,
        private resourceService: ResourceService,
        public activeModal: NgbActiveModal,
        private eventManager: EventManager
    ) {
        this.jhiLanguageService.setLocations(['resource', 'resourceType']);
    }

    clear () {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete (id: number) {
        this.resourceService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'resourceListModification',
                content: 'Deleted an resource'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-resource-delete-popup',
    template: ''
})
export class ResourceDeletePopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor (
        private route: ActivatedRoute,
        private resourcePopupService: ResourcePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            this.modalRef = this.resourcePopupService
                .open(ResourceDeleteDialogComponent, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
