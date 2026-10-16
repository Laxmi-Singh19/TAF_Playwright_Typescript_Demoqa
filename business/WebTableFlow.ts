import { WebTablesPage } from '../pages/WebTablesPage';
import { Validator } from '../core/Validator';

// Business layer: what a user does with the Web Table
export class WebTableFlow {
  constructor(private tablePage: WebTablesPage, private check: Validator) {}

  async addAndFindRecord(data: any) {
    await this.tablePage.openPage();
    await this.tablePage.addRecord(data);
    await this.tablePage.search(data.email);
  }

  async verifyRecordShown(data: any) {
    const table = this.tablePage.selectors.table;
    await this.check.verifyContainsText(table, data.firstName);
    await this.check.verifyContainsText(table, data.age);
  }

  async updateAge(data: any) {
    await this.tablePage.editAge(data.newAge);
    await this.check.verifyContainsText(this.tablePage.selectors.table, data.newAge);
  }

  async deleteRecord(data: any) {
    await this.tablePage.deleteFirstRow();
    await this.check.verifyNotContainsText(this.tablePage.selectors.table, data.email);
  }
}