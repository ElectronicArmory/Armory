import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { Course } from './course.model';
import { CourseService } from './course.service';

@Component({
    selector: 'jhi-course-detail',
    templateUrl: './course-detail.component.html'
})
export class CourseDetailComponent implements OnInit, OnDestroy {

    course: Course;
    private subscription: any;

    constructor(
        private jhiLanguageService: JhiLanguageService,
        private courseService: CourseService,
        private route: ActivatedRoute
    ) {
        this.jhiLanguageService.setLocations(['course', 'level']);
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe(params => {
            this.load(params['id']);
        });
    }

    load (id) {
        this.courseService.find(id).subscribe(course => {
            this.course = course;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

}
