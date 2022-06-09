import { Routes } from '@angular/router';
import { HomeComponent } from '../home/home.component';
import { provideToolbarColor } from '../layouts/toolbar-color';
import { VerticalLayoutComponent } from '../layouts/vertical/vertical.layout.component';
import { TitleCampaignResolver } from '../resolvers/title-campaign.resolver';

const routes: Routes = [
  {
    path: '',
    component: VerticalLayoutComponent,
    providers: [provideToolbarColor('accent')],
    resolve: {
      titleCampaign: TitleCampaignResolver,
    },
    children: [
      {
        path: '',
        title: '_.TITLE.HOME',
        component: HomeComponent,
      },
    ],
  },
];

export default routes;
