/**
 * @license
 * Copyright 2020 Dynatrace LLC
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { DtIconModule } from '@dynatrace/barista-components/icon';
import { DtDrawerModule } from '@dynatrace/barista-components/drawer';
import { DtTopBarNavigationModule } from '@dynatrace/barista-components/top-bar-navigation';
import { DtMenuModule } from '@dynatrace/barista-components/menu';
import { DtBreadcrumbsModule } from '@dynatrace/barista-components/breadcrumbs';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing.module';
import { PaletteServicesModule } from '../services/palette';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    DtIconModule.forRoot({ svgIconLocation: '/assets/icons/{{name}}.svg' }),
    DtDrawerModule,
    DtTopBarNavigationModule,
    DtBreadcrumbsModule,
    DtMenuModule,
    HttpClientModule,
    PaletteServicesModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
