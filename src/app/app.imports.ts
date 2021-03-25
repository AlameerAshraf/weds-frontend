import * as appComponents from './app-components';
import { ThemeModule } from './theme/theme.module';

export const COMPONENTS = {
    ...appComponents
};

import { NgxSpinnerModule } from "ngx-spinner";

export const THEME_MODULE = ThemeModule;
export const NGX_SPINNER = NgxSpinnerModule;
