import { WidgetsPage } from '../pages/WidgetsPage';
import { InteractionsPage } from '../pages/InteractionsPage';
import { Validator } from '../core/Validator';

// Business layer: what a user does with widgets and mouse interactions
export class WidgetsInteractionsFlow {
  constructor(
    private widgets: WidgetsPage,
    private interactions: InteractionsPage,
    private check: Validator,
  ) {}

  async pickDate(data: any) {
    await this.widgets.openDatePicker();
    await this.widgets.setDate(data.date);
    await this.check.verifyHasValue(this.widgets.selectors.dateInput, data.date);
  }

  async chooseColor(data: any) {
    await this.widgets.openAutoComplete();
    await this.widgets.selectColor(data.colorSearch, data.colorOption);
    await this.check.verifyHasText(this.widgets.selectors.selectedColor, data.colorOption);
  }

  async dragAndDropBox() {
    await this.interactions.openDroppablePage();
    await this.interactions.dragToTarget();
    await this.check.verifyHasText(this.interactions.selectors.droppable, 'Dropped!');
  }
}