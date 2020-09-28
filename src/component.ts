/**
 * Interface defining a component.
 * Usage:
 *
 * ```
 * class Health implements Component {
 *   name = "health";
 *   amount: number;
 *
 *   constructor(amount: number) {
 *     this.amount = amount;
 *   }
 * }
 * ```
 */
export default interface Component {
  /**
   * The component name. Mostly for debugging purposes.
   */
  name: string;
}
