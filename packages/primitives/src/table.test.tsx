import { cleanup } from '@testing-library/react';
import React from 'react';
import { describe, it, expect, vi, afterEach } from 'vitest';

import { render } from './test-utils';

import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from './index';

afterEach(cleanup);
