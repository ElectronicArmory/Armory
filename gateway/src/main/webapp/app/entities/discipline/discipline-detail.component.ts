import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { Discipline } from './discipline.model';
import { DisciplineService } from './discipline.service';

@Component({
    selector: 'jhi-discipline-detail',
    templateUrl: './discipline-detail.component.html'
})
export class DisciplineDetailComponent implements OnInit, OnDestroy {

    discipline: Discipline;
    private subscription: any;

    constructor(
        private jhiLanguageService: JhiLanguageService,
        private disciplineService: DisciplineService,
        private route: ActivatedRoute
    ) {
        this.jhiLanguageService.setLocations(['discipline']);
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe(params => {
            this.load(params['id']);
        });
    }

    load (id) {
        this.disciplineService.find(id).subscribe(discipline => {
            this.discipline = discipline;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

}
