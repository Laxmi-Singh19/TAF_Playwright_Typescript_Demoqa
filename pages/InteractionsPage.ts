import { BasePage } from '../core/BasePage';

export class InteractionsPage extends BasePage {
  readonly selectors = {
    draggable: '#simpleDropContainer #draggable',
    droppable: '#simpleDropContainer #droppable',
    droppableReady: '#simpleDropContainer #droppable.ui-droppable',   // the class appears when the page script is ready
  };

  async openDroppablePage() {
    await this.open('/droppable');
  }

  async dragToTarget() {
    await this.dragAndDrop(this.selectors.draggable, this.selectors.droppableReady);
  }
}