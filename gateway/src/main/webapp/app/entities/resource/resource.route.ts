import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { PaginationUtil } from 'ng-jhipster';

import { ResourceComponent } from './resource.component';
import { ResourceDetailComponent } from './resource-detail.component';
import { ResourcePopupComponent } from './resource-dialog.component';
import { ResourceDeletePopupComponent } from './resource-delete-dialog.component';

import { Principal } from '../../shared';


export const resourceRoute: Routes = [
  {
    path: 'resource',
    component: ResourceComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'armoryApp.resource.home.title'
    }
  }, {
    path: 'resource/:id',
    component: ResourceDetailComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'armoryApp.resource.home.title'
    }
  }
];

export const resourcePopupRoute: Routes = [
  {
    path: 'resource-new',
    component: ResourcePopupComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'armoryApp.resource.home.title'
    },
    outlet: 'popup'
  },
  {
    path: 'resource/:id/edit',
    component: ResourcePopupComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'armoryApp.resource.home.title'
    },
    outlet: 'popup'
  },
  {
    path: 'resource/:id/delete',
    component: ResourceDeletePopupComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'armoryApp.resource.home.title'
    },
    outlet: 'popup'
  }
];
