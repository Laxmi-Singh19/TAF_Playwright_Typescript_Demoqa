import { BasePage } from './BasePage';

export class WebTablesPage extends BasePage {
  // Add / Edit form
  readonly addButton = this.page.locator('#addNewRecordButton');
  readonly firstName = this.page.locator('#firstName');
  readonly lastName = this.page.locator('#lastName');
  readonly email = this.page.locator('#userEmail');
  readonly age = this.page.locator('#age');
  readonly salary = this.page.locator('#salary');
  readonly department = this.page.locator('#department');
  readonly submitButton = this.page.locator('#submit');

  // Table
  readonly searchBox = this.page.locator('#searchBox');
  readonly tableBody = this.page.locator('.rt-tbody');
  readonly editIcon = this.page.locator('span[title="Edit"]').first();
  readonly deleteIcon = this.page.locator('span[title="Delete"]').first();

  async openPage() {
    await this.open('/webtables');
  }

  async addRecord(data: any) {
    await this.addButton.click();
    await this.firstName.fill(data.firstName);
    await this.lastName.fill(data.lastName);
    await this.email.fill(data.email);
    await this.age.fill(data.age);
    await this.salary.fill(data.salary);
    await this.department.fill(data.department);
    await this.submitButton.click();
  }

  async search(text: string) {
    await this.searchBox.fill(text);
  }

  async editAge(newAge: string) {
    await this.editIcon.click();
    await this.age.fill(newAge);
    await this.submitButton.click();
  }

  async deleteFirstRow() {
    await this.deleteIcon.click();
  }
}
