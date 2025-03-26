/**
 * @class UndoManager
 * @description A class to manage undo and redo operations
 * @private {Array<{before: any, after: any}>} undoStack
 * @private {Array<{before: any, after: any}>} redoStack
 * @method execute
 * @method undo
 * @method redo
 * @method canUndo
 * @method canRedo
 * @method toString
 */
export class UndoManager {
  private undoStack: { before: any; after: any }[] = [];
  private redoStack: { before: any; after: any }[] = [];

  /**
   * @method execute
   * @description Execute an undoable operation
   * @param before
   * @param after
   * @returns {void}
   */
  execute(before: any, after: any): void {
    this.undoStack.push({ before, after });
    this.redoStack = [];
    console.log(this.toString());
  }

  /**
   * @method undo
   * @description Undo the last operation
   * @param None
   * @returns {any}
   */
  undo() {
    if (this.undoStack.length > 0) {
      const state = this.undoStack.pop();
      if (state) {
        this.redoStack.push(state);
        console.log(this.toString());
        return state.before;
      }
    }
    return null;
  }

  /**
   * @method redo
   * @description Redo the last undone operation
   * @param None
   * @returns {any}
   */
  redo() {
    if (this.redoStack.length > 0) {
      const state = this.redoStack.pop();
      if (state) {
        this.undoStack.push(state);
        console.log(this.toString());
        return state.after;
      }
    }
    return null;
  }

  /**
   * @method canUndo
   * @description Check if there are operations to undo
   * @param None
   * @returns {boolean}
   */
  get canUndo(): boolean {
    return this.undoStack.length > 0;
  }

  /**
   * @method canRedo
   * @description Check if there are operations to redo
   * @param None
   * @returns {boolean}
   */
  get canRedo(): boolean {
    return this.redoStack.length > 0;
  }

  /**
   * @method toString
   * @description Return a string representation of the undo and redo stacks
   * @param None
   * @returns {string}
   */
  toString() {
    return `undoStack: ${this.undoStack.length}, redoStack: ${this.redoStack.length}`;
  }
}
