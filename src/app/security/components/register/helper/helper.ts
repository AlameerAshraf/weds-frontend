import { Router } from '@angular/router';

export class helper {
  constructor(private router: Router) {
  };

  /** Change the type for who is registerating now! */
  changeRegisterationType(type: string) {
    if (type == "user") window.location.href = "/security/ar/register";
    else window.location.href = `/security/ar/register?vendor=join`
  };

  /** Change the type for who is registerating now! */
  navigateToLogin() {
    this.router.navigateByUrl(`/security/ar/login`);
  };
};
