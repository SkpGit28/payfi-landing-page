import React from 'react';

export type Page = 'home' | 'developers' | 'pricing' | 'ecommerce' | 'saas' | 'services' | 'marketplaces' | 'enterprises' | 'signup';

export interface NavigationContextType {
    navigate: (page: Page) => void;
    currentPage: Page;
}

export const NavigationContext = React.createContext<NavigationContextType | undefined>(undefined);
