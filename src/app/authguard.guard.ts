import { CanActivateFn } from '@angular/router';

export const authguardGuard: CanActivateFn = (route, state) => {
  if(localStorage.getItem('userRole') === 'member') {
  return true;
}
  else {
    alert('You are not authorized to access this page');
    return false;
  }

};
