import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { Resource } from './resource.model';
import { ResourceService } from './resource.service';

@Component({
    selector: 'jhi-resource-detail',
    templateUrl: './resource-detail.component.html'
})
export class ResourceDetailComponent implements OnInit, OnDestroy {

    resource: Resource;
    private subscription: any;

    constructor(
        private jhiLanguageService: JhiLanguageService,
        private resourceService: ResourceService,
        private route: ActivatedRoute
    ) {
        this.jhiLanguageService.setLocations(['resource', 'resourceType']);
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe(params => {
            this.load(params['id']);
        });
    }

    load (id) {
        this.resourceService.find(id).subscribe(resource => {
            this.resource = resource;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

}
