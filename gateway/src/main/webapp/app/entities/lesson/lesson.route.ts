import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { PaginationUtil } from 'ng-jhipster';

import { LessonComponent } from './lesson.component';
import { LessonDetailComponent } from './lesson-detail.component';
import { LessonPopupComponent } from './lesson-dialog.component';
import { LessonDeletePopupComponent } from './lesson-delete-dialog.component';

import { Principal } from '../../shared';


export const lessonRoute: Routes = [
  {
    path: 'lesson',
    component: LessonComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'armoryApp.lesson.home.title'
    }
  }, {
    path: 'lesson/:id',
    component: LessonDetailComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'armoryApp.lesson.home.title'
    }
  }
];

export const lessonPopupRoute: Routes = [
  {
    path: 'lesson-new',
    component: LessonPopupComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'armoryApp.lesson.home.title'
    },
    outlet: 'popup'
  },
  {
    path: 'lesson/:id/edit',
    component: LessonPopupComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'armoryApp.lesson.home.title'
    },
    outlet: 'popup'
  },
  {
    path: 'lesson/:id/delete',
    component: LessonDeletePopupComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'armoryApp.lesson.home.title'
    },
    outlet: 'popup'
  }
];
