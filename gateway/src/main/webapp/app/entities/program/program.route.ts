import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { PaginationUtil } from 'ng-jhipster';

import { ProgramComponent } from './program.component';
import { ProgramDetailComponent } from './program-detail.component';
import { ProgramPopupComponent } from './program-dialog.component';
import { ProgramDeletePopupComponent } from './program-delete-dialog.component';

import { Principal } from '../../shared';

@Injectable()
export class ProgramResolvePagingParams implements Resolve<any> {

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

export const programRoute: Routes = [
  {
    path: 'program',
    component: ProgramComponent,
    resolve: {
      'pagingParams': ProgramResolvePagingParams
    },
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'armoryApp.program.home.title'
    }
  }, {
    path: 'program/:id',
    component: ProgramDetailComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'armoryApp.program.home.title'
    }
  }
];

export const programPopupRoute: Routes = [
  {
    path: 'program-new',
    component: ProgramPopupComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'armoryApp.program.home.title'
    },
    outlet: 'popup'
  },
  {
    path: 'program/:id/edit',
    component: ProgramPopupComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'armoryApp.program.home.title'
    },
    outlet: 'popup'
  },
  {
    path: 'program/:id/delete',
    component: ProgramDeletePopupComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'armoryApp.program.home.title'
    },
    outlet: 'popup'
  }
];
