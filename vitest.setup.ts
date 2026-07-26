import '@testing-library/jest-dom/vitest';
import { setupTestEnvironment } from '@holiveira/testing';

process.env.NEXT_PUBLIC_APP_URL = 'http://localhost:3000';
process.env.BETTER_AUTH_SECRET = 'mock-secret';
process.env.BETTER_AUTH_URL = 'http://localhost:3000';
process.env.GOOGLE_CLIENT_ID = 'mock-id';
process.env.GOOGLE_CLIENT_SECRET = 'mock-secret';

setupTestEnvironment();
