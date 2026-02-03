import React, { createContext, useContext, useState, useMemo } from 'react';
import sprintsData from '../data/sprints.json';

interface Sprint {
    id: string;
    startDate: string;
    endDate: string;
    goals: string[];
    changes: any[];
    boardSnapshots: Record<string, any[]>;
}

interface SprintContextType {
    activeSprintId: string;
    setActiveSprintId: (id: string) => void;
    currentSprint: Sprint | null;
    isLatest: boolean;
    sprints: Sprint[];
}

const SprintContext = createContext<SprintContextType | undefined>(undefined);

export const SprintProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const sprints = useMemo(() => sprintsData as Sprint[], []);
    
    // Default to the latest sprint ID
    const [activeSprintId, setActiveSprintId] = useState<string>(
        sprints.length > 0 ? sprints[sprints.length - 1].id : ''
    );

    const currentSprint = useMemo(() => {
        return sprints.find(s => s.id === activeSprintId) || null;
    }, [activeSprintId, sprints]);

    const isLatest = activeSprintId === (sprints.length > 0 ? sprints[sprints.length - 1].id : '');

    return (
        <SprintContext.Provider value={{
            activeSprintId,
            setActiveSprintId,
            currentSprint,
            isLatest,
            sprints
        }}>
            {children}
        </SprintContext.Provider>
    );
};

export const useSprint = () => {
    const context = useContext(SprintContext);
    if (!context) {
        throw new Error('useSprint must be used within a SprintProvider');
    }
    return context;
};
