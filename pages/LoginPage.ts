import { BasePage } from './BasePage';

export class LoginPage extends BasePage {
  readonly userNameInput = this.page.locator('#userName');
  readonly passwordInput = this.page.locator('#password');
  readonly loginButton = this.page.locator('#login');

  async openPage() {
    await this.open('/login');
  }

  // Enter the credentials and click Login
  async login(userName: string, password: string) {
    await this.userNameInput.fill(userName);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
    await this.page.waitForURL('**/profile');   // wait until the login
  }
}
