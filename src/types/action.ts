/**
 * Standard result type for server actions
 * Use this type to return consistent responses from all server actions
 */
export type ActionResult<T = void> = 
  | { success: true; data?: T }
  | { success: false; error: string };
