import type { ReactNode, ComponentType, ReactElement } from 'react';
import type { RenderOptions } from '@testing-library/react';

export interface ProviderConfig {
  providers: ComponentType<{ children: ReactNode }>[];
}

export interface RenderWithProvidersOptions extends RenderOptions {
  providerConfig: ProviderConfig;
}

export interface MockSessionOptions {
  user?: {
    id?: string;
    name?: string;
    email?: string;
    image?: string | null;
    emailVerified?: boolean | null;
  };
  session?: {
    expiresAt?: Date;
    token?: string;
    fresh?: boolean;
  };
}

export interface MockPointerEvent {
  pointerType: string;
  clientX: number;
  clientY: number;
  button: number;
  target: EventTarget | null;
  currentTarget: EventTarget | null;
  preventDefault: () => void;
  stopPropagation: () => void;
}

export interface MockClipboardEvent {
  clipboardData: {
    getData: (format: string) => string;
    setData: (format: string, data: string) => void;
  };
  preventDefault: () => void;
}
