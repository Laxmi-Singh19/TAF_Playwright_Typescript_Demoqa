import { BasePage } from '../core/BasePage';
export class WebTablesPage extends BasePage {
  readonly selectors = {
    addButton: '#addNewRecordButton',
    firstName: '#firstName',
    lastName: '#lastName',
    email: '#userEmail',
    age: '#age',
    salary: '#salary',
    department: '#department',
    submit: '#submit',
    searchBox: '#searchBox',
    table: 'role=table',
    editIcon: 'span[title="Edit"] >> nth=0',
    deleteIcon: 'span[title="Delete"] >> nth=0',
  };

  async openPage() {
    await this.open('/webtables');
  }

  async addRecord(data: any) {
    await this.click(this.selectors.addButton);
    await this.type(this.selectors.firstName, data.firstName);
    await this.type(this.selectors.lastName, data.lastName);
    await this.type(this.selectors.email, data.email);
    await this.type(this.selectors.age, data.age);
    await this.type(this.selectors.salary, data.salary);
    await this.type(this.selectors.department, data.department);
    await this.click(this.selectors.submit);
  }

  async search(text: string) {
    await this.type(this.selectors.searchBox, text);
  }

  async editAge(newAge: string) {
    await this.click(this.selectors.editIcon);
    await this.type(this.selectors.age, newAge);
    await this.click(this.selectors.submit);
  }

  async deleteFirstRow() {
    await this.click(this.selectors.deleteIcon);
  }
}