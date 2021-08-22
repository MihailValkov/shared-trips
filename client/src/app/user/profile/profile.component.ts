import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AuthService } from 'src/app/core/auth.service';
import { IUserModuleState } from '../+store';
import { userProfileAvatarInputIsActive, userProfileCoverInputIsActive } from '../+store/actions';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})

export class ProfileComponent {

  user$ = this.authService.user$;
  avatarInputIsActive$ = this.store.select(state => state.user.profile.avatarInputIsActive);;
  coverInputIsActive$ = this.store.select(state => state.user.profile.coverInputIsActive);;

  constructor(
    private router: Router,
    private authService: AuthService,
    private store: Store<IUserModuleState>
  ) { }

  getImageUrl(data: { imageUrl: string, message: string }, imageType: string): void {
    if (data?.message) { return; }
    
    this.authService
      .editUserPhoto(imageType === 'avatar' ? { avatarImg: data.imageUrl } : { coverImg: data.imageUrl })
      .subscribe(() => {
        this.store.dispatch(userProfileAvatarInputIsActive({ isActive: false }))
        this.store.dispatch(userProfileCoverInputIsActive({ isActive: false }))
      })
  }
  showAvatarInput() {
    this.store.dispatch(userProfileAvatarInputIsActive({ isActive: true }))
    this.store.dispatch(userProfileCoverInputIsActive({ isActive: false }))
  }
  showCoverInput() {
    this.store.dispatch(userProfileAvatarInputIsActive({ isActive: false }))
    this.store.dispatch(userProfileCoverInputIsActive({ isActive: true }))
  }

  isLinkActive(url: string): boolean {
    const queryParamsIndex = this.router.url.indexOf('?');
    const baseUrl = queryParamsIndex === -1 ? this.router.url :
      this.router.url.slice(0, queryParamsIndex);
    return baseUrl === url;
  }
}

