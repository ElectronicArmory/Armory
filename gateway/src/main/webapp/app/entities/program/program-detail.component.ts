import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { Program } from './program.model';
import { ProgramService } from './program.service';

@Component({
    selector: 'jhi-program-detail',
    templateUrl: './program-detail.component.html'
})
export class ProgramDetailComponent implements OnInit, OnDestroy {

    program: Program;
    private subscription: any;

    constructor(
        private jhiLanguageService: JhiLanguageService,
        private programService: ProgramService,
        private route: ActivatedRoute
    ) {
        this.jhiLanguageService.setLocations(['program']);
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe(params => {
            this.load(params['id']);
        });
    }

    load (id) {
        this.programService.find(id).subscribe(program => {
            this.program = program;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

}
