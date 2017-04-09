import { ComponentFixture, TestBed, async, inject } from '@angular/core/testing';
import { MockBackend } from '@angular/http/testing';
import { Http, BaseRequestOptions } from '@angular/http';
import { OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { DateUtils, DataUtils } from 'ng-jhipster';
import { JhiLanguageService } from 'ng-jhipster';
import { MockLanguageService } from '../../../helpers/mock-language.service';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { CourseDetailComponent } from '../../../../../../main/webapp/app/entities/course/course-detail.component';
import { CourseService } from '../../../../../../main/webapp/app/entities/course/course.service';
import { Course } from '../../../../../../main/webapp/app/entities/course/course.model';

describe('Component Tests', () => {

    describe('Course Management Detail Component', () => {
        let comp: CourseDetailComponent;
        let fixture: ComponentFixture<CourseDetailComponent>;
        let service: CourseService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                declarations: [CourseDetailComponent],
                providers: [
                    MockBackend,
                    BaseRequestOptions,
                    DateUtils,
                    DataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    {
                        provide: Http,
                        useFactory: (backendInstance: MockBackend, defaultOptions: BaseRequestOptions) => {
                            return new Http(backendInstance, defaultOptions);
                        },
                        deps: [MockBackend, BaseRequestOptions]
                    },
                    {
                        provide: JhiLanguageService,
                        useClass: MockLanguageService
                    },
                    CourseService
                ]
            }).overrideComponent(CourseDetailComponent, {
                set: {
                    template: ''
                }
            }).compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(CourseDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CourseService);
        });


        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN
            spyOn(service, 'find').and.returnValue(Observable.of(new Course(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.course).toEqual(jasmine.objectContaining({id:10}));
            });
        });
    });

});
