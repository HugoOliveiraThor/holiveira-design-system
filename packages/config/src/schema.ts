/** Describes a single environment variable entry in a config schema. */
export interface ConfigSchemaEntry {
  /** The expected type of the variable. */
  type: 'string' | 'number' | 'boolean';
  /** Whether this variable is required at runtime. */
  required?: boolean;
  /** Default value when the variable is not set. */
  default?: string;
  /** Human-readable description of the variable's purpose. */
  description?: string;
}

/** A schema definition describing the expected shape of a set of environment variables. */
export type ConfigSchema = Record<string, ConfigSchemaEntry>;

/** Helper to create a typed config schema with full autocompletion. */
export function defineConfig(schema: ConfigSchema): ConfigSchema {
  return schema;
}
