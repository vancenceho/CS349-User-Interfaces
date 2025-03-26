// Same code taken from lecture notes

/**
 * Observer pattern
 * @description Observer interface
 * @interface Observer
 * @method update
 * @returns {void}
 */
export interface Observer {
  update: () => void;
}

/**
 * @class Subject
 * @description Subject class
 * @method addObserver
 * @method removeObserver
 * @method notifyObservers
 * @property {Observer[]} observers - Array of observers
 */
export class Subject {
  private observers: Observer[] = [];

  /**
   * @description Add an observer
   * @method addObserver
   * @param observer
   * @returns {void}
   */
  addObserver(observer: Observer) {
    this.observers.push(observer);
    observer.update();
  }

  /**
   * @description Remove an observer
   * @method removeObserver
   * @param observer
   * @returns {void}
   */
  removeObserver(observer: Observer) {
    this.observers.splice(this.observers.indexOf(observer), 1);
  }
  /**
   * @description Notify all observers
   * @method notifyObservers
   * @param None
   * @returns {void}
   */
  protected notifyObservers() {
    for (const o of this.observers) {
      o.update();
    }
  }
}
