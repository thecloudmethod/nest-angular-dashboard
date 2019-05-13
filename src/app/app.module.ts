import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { TransferHttpCacheModule } from '@nguniversal/common';
import { AppComponent } from './app.component';
import { IndexComponent } from './views/root/index.component';
import { SharedModule } from './modules/shared/shared.module';
import { WindowService } from './services/window/window.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularMaterialModule } from './modules/angular-material';

// For AoT compilation:
export function getWindow() {
  return window;
}

@NgModule({
  declarations: [
    AppComponent,
    IndexComponent
  ],
  imports: [
    HttpClientModule,
    // Add .withServerTransition() to support Universal rendering.
    // The application ID can be any identifier which is unique on
    // the page.
    BrowserModule.withServerTransition({appId: 'my-app'}),
    TransferHttpCacheModule,
    AngularMaterialModule,
    BrowserAnimationsModule,
    RouterModule.forRoot([
      { path: '', component: IndexComponent, pathMatch: 'full'},
      { path: 'speakers', loadChildren: './modules/speakers/speakers.module#SpeakersModule'}
    ]),
    SharedModule
  ],
  providers: [
    {
      provide: WindowService,
      useFactory: getWindow
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
