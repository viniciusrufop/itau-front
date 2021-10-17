import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AuthModule } from "./auth/auth.module";
import { LayoutModule } from "./layout/layout.module";
import { HttpClient, HttpClientModule } from "@angular/common/http";
import { BlockUIModule } from "ng-block-ui";
import { ToastrModule } from "ngx-toastr";
import { NgxMaskModule } from "ngx-mask";
import { TranslateLoader, TranslateModule } from "@ngx-translate/core";
import {TranslateHttpLoader} from '@ngx-translate/http-loader';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserAnimationsModule,
    AuthModule,
    LayoutModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BlockUIModule.forRoot(),
    ToastrModule.forRoot(),
    NgxMaskModule.forRoot(),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
