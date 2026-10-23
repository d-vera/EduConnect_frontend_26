import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { ContentListComponent } from './features/content/content-list/content-list.component';
import { ArticleDetailComponent } from './features/content/article-detail/article-detail.component';
import { QuizComponent } from './features/quiz/quiz.component';
import { CommunityHubComponent } from './features/community/community-hub/community-hub.component';
import { DevelopersComponent } from './features/developers/developers.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    title: 'EduConnect | Inicio'
  },
  {
    path: 'content',
    component: ContentListComponent,
    title: 'EduConnect | Artículos Educativos'
  },
  {
    path: 'content/:slug',
    component: ArticleDetailComponent,
    title: 'EduConnect | Lectura de Artículo'
  },
  {
    path: 'quiz',
    component: QuizComponent,
    title: 'EduConnect | Cuestionario Interactivo'
  },
  {
    path: 'comunidad',
    component: CommunityHubComponent,
    title: 'EduConnect | Comunidad & Avisos'
  },
  {
    path: 'developers',
    component: DevelopersComponent,
    title: 'EduConnect | Equipo & Matriz Técnica'
  },
  {
    path: '**',
    redirectTo: ''
  }
];
