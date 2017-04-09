import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { PaginationUtil } from 'ng-jhipster';

import { DisciplineComponent } from './discipline.component';
import { DisciplineDetailComponent } from './discipline-detail.component';
import { DisciplinePopupComponent } from './discipline-dialog.component';
import { DisciplineDeletePopupComponent } from './discipline-delete-dialog.component';

import { Principal } from '../../shared';


export const disciplineRoute: Routes = [
  {
    path: 'discipline',
    component: DisciplineComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'armoryApp.discipline.home.title'
    }
  }, {
    path: 'discipline/:id',
    component: DisciplineDetailComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'armoryApp.discipline.home.title'
    }
  }
];

export const disciplinePopupRoute: Routes = [
  {
    path: 'discipline-new',
    component: DisciplinePopupComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'armoryApp.discipline.home.title'
    },
    outlet: 'popup'
  },
  {
    path: 'discipline/:id/edit',
    component: DisciplinePopupComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'armoryApp.discipline.home.title'
    },
    outlet: 'popup'
  },
  {
    path: 'discipline/:id/delete',
    component: DisciplineDeletePopupComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'armoryApp.discipline.home.title'
    },
    outlet: 'popup'
  }
];
