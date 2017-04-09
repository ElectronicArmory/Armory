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
import { ResourceDetailComponent } from '../../../../../../main/webapp/app/entities/resource/resource-detail.component';
import { ResourceService } from '../../../../../../main/webapp/app/entities/resource/resource.service';
import { Resource } from '../../../../../../main/webapp/app/entities/resource/resource.model';

describe('Component Tests', () => {

    describe('Resource Management Detail Component', () => {
        let comp: ResourceDetailComponent;
        let fixture: ComponentFixture<ResourceDetailComponent>;
        let service: ResourceService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                declarations: [ResourceDetailComponent],
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
                    ResourceService
                ]
            }).overrideComponent(ResourceDetailComponent, {
                set: {
                    template: ''
                }
            }).compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ResourceDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ResourceService);
        });


        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN
            spyOn(service, 'find').and.returnValue(Observable.of(new Resource(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.resource).toEqual(jasmine.objectContaining({id:10}));
            });
        });
    });

});
