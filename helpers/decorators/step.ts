import { test } from "@playwright/test";

/**
 * Decorator that wraps a method to identify it as a test step
 * @param stepName Optional name for the step (defaults to class.method name)
 */
export function step(stepName?: string) {
  // This function signature works with both old and new decorator patterns
  return function decoratorFunction(
    target: any,
    propertyKey?: string | symbol,
    descriptorOrContext?: PropertyDescriptor | any,
  ): any {
    // Stage 3 decorator - called directly with the method
    if (typeof target === "function" && !propertyKey) {
      const originalMethod = target;

      return async function (...args: any[]) {
        const name = stepName || "Test Step";

        try {
          return await test.step(name, async () => {
            return await originalMethod.apply(this, args);
          });
        } catch (error) {
          console.error(`Error in step "${name}":`, error);
          throw error;
        }
      };
    }

    // Experimental decorator pattern
    else if (propertyKey && descriptorOrContext) {
      const descriptor = descriptorOrContext as PropertyDescriptor;
      const originalMethod = descriptor.value;

      if (typeof originalMethod !== "function") {
        console.warn(
          `Step decorator applied to non-method: ${String(propertyKey)}`,
        );
        return descriptor;
      }

      descriptor.value = async function (...args: any[]) {
        const name =
          stepName ||
          `${this.constructor?.name || "Unknown"}.${String(propertyKey)}`;

        try {
          // Execute the original method within a test step
          const result = await test.step(name, async () => {
            return await originalMethod.apply(this, args);
          });

          // If the result is a Promise, handle it appropriately
          if (result instanceof Promise) {
            return await result;
          }

          // If the result is an object with methods (for chaining),
          // return the result directly to enable method chaining
          return result;
        } catch (error) {
          console.error(`Error in step "${name}":`, error);
          throw error;
        }
      };

      return descriptor;
    }

    // Fallback for unexpected usage
    console.warn("Step decorator applied in an unexpected way");
    return target;
  };
}
