import { BasePage } from '../core/BasePage';

export class LoginPage extends BasePage {
  readonly selectors = {
    userName: '#userName',
    password: '#password',
    loginButton: '#login',
  };

  async openPage() {
    await this.open('/login');
  }

  async signIn(userName: string, password: string) {
    await this.type(this.selectors.userName, userName);
    await this.type(this.selectors.password, password);
    await this.click(this.selectors.loginButton);
  }
}