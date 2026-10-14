import { BasePage } from './BasePage';

export class InteractionsPage extends BasePage {
  // Simple drop area on the Droppable page
  readonly draggable = this.page.locator('#simpleDropContainer #draggable');
  readonly droppable = this.page.locator('#simpleDropContainer #droppable');

  async openDroppablePage() {
    await this.open('/droppable');
  }

  // Drag the small box onto the target box with real mouse movements
  async dragToTarget() {
    // 1. wait until the page's drag and drop script has finished loading
    await this.page.locator('#simpleDropContainer #droppable.ui-droppable').waitFor();

    // 2. make sure both boxes are on the screen, then read their positions
    await this.draggable.scrollIntoViewIfNeeded();
    const from = await this.draggable.boundingBox();
    const to = await this.droppable.boundingBox();
    if (!from || !to) throw new Error('Drag or drop element is not visible');

    const startX = from.x + from.width / 2;
    const startY = from.y + from.height / 2;

    // 3. press the mouse, move a few pixels to start the drag, then go to the target
    await this.page.mouse.move(startX, startY);
    await this.page.mouse.down();
    await this.page.mouse.move(startX + 10, startY + 10, { steps: 5 });
    await this.page.mouse.move(to.x + to.width / 2, to.y + to.height / 2, { steps: 20 });
    await this.page.mouse.up();
  }
}