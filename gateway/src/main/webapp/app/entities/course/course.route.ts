import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { PaginationUtil } from 'ng-jhipster';

import { CourseComponent } from './course.component';
import { CourseDetailComponent } from './course-detail.component';
import { CoursePopupComponent } from './course-dialog.component';
import { CourseDeletePopupComponent } from './course-delete-dialog.component';

import { Principal } from '../../shared';

@Injectable()
export class CourseResolvePagingParams implements Resolve<any> {

  constructor(private paginationUtil: PaginationUtil) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
      let page = route.queryParams['page'] ? route.queryParams['page'] : '1';
      let sort = route.queryParams['sort'] ? route.queryParams['sort'] : 'id,asc';
      return {
          page: this.paginationUtil.parsePage(page),
          predicate: this.paginationUtil.parsePredicate(sort),
          ascending: this.paginationUtil.parseAscending(sort)
    };
  }
}

export const courseRoute: Routes = [
  {
    path: 'course',
    component: CourseComponent,
    resolve: {
      'pagingParams': CourseResolvePagingParams
    },
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'armoryApp.course.home.title'
    }
  }, {
    path: 'course/:id',
    component: CourseDetailComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'armoryApp.course.home.title'
    }
  }
];

export const coursePopupRoute: Routes = [
  {
    path: 'course-new',
    component: CoursePopupComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'armoryApp.course.home.title'
    },
    outlet: 'popup'
  },
  {
    path: 'course/:id/edit',
    component: CoursePopupComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'armoryApp.course.home.title'
    },
    outlet: 'popup'
  },
  {
    path: 'course/:id/delete',
    component: CourseDeletePopupComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'armoryApp.course.home.title'
    },
    outlet: 'popup'
  }
];
