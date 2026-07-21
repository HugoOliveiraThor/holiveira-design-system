import { z } from 'zod';

type ZodResolverResult<T> =
  | { values: T; errors: Record<string, never> }
  | { values: Record<string, never>; errors: Record<string, { message: string }> };

function zodResolver<T>(schema: z.ZodType<T>) {
  return async (data: unknown): Promise<ZodResolverResult<T>> => {
    const result = await schema.safeParseAsync(data);

    if (result.success) {
      return { values: result.data, errors: {} };
    }

    const errors: Record<string, { message: string }> = {};
    for (const issue of result.error.issues) {
      const path = issue.path.join('.');
      if (!errors[path]) {
        errors[path] = { message: issue.message };
      }
    }

    return { values: {} as Record<string, never>, errors };
  };
}

export { zodResolver, type ZodResolverResult };
