import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {ModalService} from '../modal/modal.service';
import {AuthService} from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class HeaderControlsService {
  private routes = environment.routes;

  constructor(
    private modalService: ModalService,
    private authService: AuthService
  ) {
  }

  public openModal(link: string) {
    console.log(this.routes);
    console.log(link);
    console.log(this.routes[link]);
    this.modalService.openModal(this.routes[link]);
  }

  logout() {
    this.authService.logout();
  }
}
