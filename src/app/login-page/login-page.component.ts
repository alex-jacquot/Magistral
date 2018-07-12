import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../providers/auth.service';
import { UserService } from '../providers/user.service';

@Component({
    selector: 'app-login-page',
    templateUrl: './login-page.component.html',
    styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {

  isNewUser = false;
  email = '';
  password = '';
  nom = '';
  prenom = '';
  pseudo = '';
  errorMessage = '';
  error: { name: string, message: string } = { name: '', message: '' };

  resetPassword = false;

  constructor(public authService: AuthService, private router: Router, private userService: UserService) { }

  ngOnInit() { }

  //Affiche les infos du user si il est connecte
  checkUserInfo() {
    if (this.authService.isUserEmailLoggedIn) {
      this.router.navigate(['/'])
    }
  }

  clearErrorMessage() {
    this.errorMessage = '';
    this.error = { name: '', message: '' };
  }

  //Differenciation entre nouvel et ancien utilisateur
  changeForm() {
    this.isNewUser = !this.isNewUser
  }

  onSignUp(): void {
    this.clearErrorMessage()

    if (this.validateForm(this.email, this.password)) {
        this.authService.signUpWithEmail(this.email, this.password)
            .then(() => {
                this.router.navigate(['/user-info'])
            }).catch(_error => {
                this.error = _error
                this.router.navigate(['/'])
            })
        .then(()=>{this.userService.creerUser(this.authService.currentUserId, this.nom, this.prenom, this.pseudo, this.email, this.password)});
    }
  }

  onLoginEmail(): void {
    this.clearErrorMessage()

    if (this.validateForm(this.email, this.password)) {
      this.authService.loginWithEmail(this.email, this.password)
        .then(() => this.router.navigate(['/user-info']))
        .catch(_error => {
          this.error = _error
          this.router.navigate(['/'])
        })
    }
  }

  validateForm(email: string, password: string): boolean {
    if (email.length === 0) {
      this.errorMessage = 'Please enter Email!'
      return false
    }

    if (password.length === 0) {
      this.errorMessage = 'Please enter Password!'
      return false
    }

    if (password.length < 6) {
      this.errorMessage = 'Password should be at least 6 characters!'
      return false
    }

    this.errorMessage = ''

    return true
  }

  isValidMailFormat(email: string) {
    const EMAIL_REGEXP = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;

    if ((email.length === 0) && (!EMAIL_REGEXP.test(email))) {
      return false;
    }

    return true;
  }

 /* sendResetEmail() {
    this.clearErrorMessage()

    this.authService.resetPassword(this.email)
      .then(() => this.resetPassword = true)
      .catch(_error => {
        this.error = _error
      })
  }*/
}
