import React from 'react';

export type Page = 'home' | 'documentations' | 'pricing' | 'ecommerce' | 'saas' | 'services' | 'marketplaces' | 'enterprises' | 'signup' | 'company';

export interface NavigationContextType {
    navigate: (page: Page) => void;
    currentPage: Page;
}

export const NavigationContext = React.createContext<NavigationContextType | undefined>(undefined);
