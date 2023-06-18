/// <reference types="@angular/localize" />

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { ThemePalette } from '@angular/material/core';

import { AppModule } from './app/app.module';

type CustomThemePalette = ThemePalette | ""

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
