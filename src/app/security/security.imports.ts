import * as securityComponents from './components';
import { ThemeModule } from '../theme/theme.module';

export const COMPONENTS = {
    ...securityComponents
};

import { NgxSpinnerModule } from "ngx-spinner";

export const THEME_MODULE = ThemeModule;
export const NGX_SPINNER = NgxSpinnerModule;

