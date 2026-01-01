import { ReactNode } from 'react';

export type TabID = 'integration' | 'api' | 'nocode';

export interface NavItem {
    id: string;
    label: string;
    depth?: number;
    children?: NavItem[];
}

export interface StepProps {
    stepNumber: number;
    title: string;
    children: ReactNode;
    isLast?: boolean;
}

export interface CodeWindowProps {
    fileName: string;
    nodeCode?: string;
    pythonCode?: string;
    jsonOutput?: string;
}

export interface BestPracticeProps {
    type: 'do' | 'dont';
    title: string;
    children: ReactNode;
}
