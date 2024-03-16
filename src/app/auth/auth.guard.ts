import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from "@angular/router";
import {Injectable} from "@angular/core";
import {UserService} from "../services/user.service";
import {Observable} from "rxjs";

@Injectable({
  providedIn: "root"
})
export class AuthGuard implements CanActivate {
  public constructor(private router: Router, private userService: UserService) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    let user = this.userService.getLoggedUser();

    if (user != null && user.userRole == "ADMIN") { // aici putem verifica daca utilizatorul logat este admin sau nu
      return true;
    } else {
      this.router.navigateByUrl('/auth');
      return false;
    }
  }
}
