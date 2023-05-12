export type BooleanValue<T extends Record<PropertyKey, unknown>> = {
  [P in keyof T]: boolean;
};

export type ObjectExtension<T extends Record<PropertyKey, unknown>> = T & {
  [key: PropertyKey]: unknown;
};
