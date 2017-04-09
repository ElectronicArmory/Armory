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
import { ProgramDetailComponent } from '../../../../../../main/webapp/app/entities/program/program-detail.component';
import { ProgramService } from '../../../../../../main/webapp/app/entities/program/program.service';
import { Program } from '../../../../../../main/webapp/app/entities/program/program.model';

describe('Component Tests', () => {

    describe('Program Management Detail Component', () => {
        let comp: ProgramDetailComponent;
        let fixture: ComponentFixture<ProgramDetailComponent>;
        let service: ProgramService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                declarations: [ProgramDetailComponent],
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
                    ProgramService
                ]
            }).overrideComponent(ProgramDetailComponent, {
                set: {
                    template: ''
                }
            }).compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ProgramDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ProgramService);
        });


        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN
            spyOn(service, 'find').and.returnValue(Observable.of(new Program(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.program).toEqual(jasmine.objectContaining({id:10}));
            });
        });
    });

});
