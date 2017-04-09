import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { Lesson } from './lesson.model';
import { LessonService } from './lesson.service';

@Component({
    selector: 'jhi-lesson-detail',
    templateUrl: './lesson-detail.component.html'
})
export class LessonDetailComponent implements OnInit, OnDestroy {

    lesson: Lesson;
    private subscription: any;

    constructor(
        private jhiLanguageService: JhiLanguageService,
        private lessonService: LessonService,
        private route: ActivatedRoute
    ) {
        this.jhiLanguageService.setLocations(['lesson', 'language']);
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe(params => {
            this.load(params['id']);
        });
    }

    load (id) {
        this.lessonService.find(id).subscribe(lesson => {
            this.lesson = lesson;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

}
