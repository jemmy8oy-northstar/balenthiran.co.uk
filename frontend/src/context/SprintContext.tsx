import React, { createContext, useContext, useState, useMemo, useEffect } from 'react';
import { useGetSprintsQuery } from '../api/staticDataApi';

interface Sprint {
    id: string;
    startDate: string;
    endDate: string;
    standupUrl?: string;
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
    isLoading: boolean;
}

const SprintContext = createContext<SprintContextType | undefined>(undefined);

export const SprintProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { data: sprints = [], isLoading } = useGetSprintsQuery();
    
    // Default to the sprint whose date range contains today; fallback to the latest sprint.
    const defaultSprintId = useMemo(() => {
        if (sprints.length === 0) return '';
        const today = new Date().toISOString().split('T')[0];
        const activeSprint = sprints.find(s => s.startDate <= today && s.endDate >= today);
        return activeSprint ? activeSprint.id : sprints[sprints.length - 1].id;
    }, [sprints]);

    const [activeSprintId, setActiveSprintId] = useState<string>('');

    // Initialize activeSprintId once data is loaded
    useEffect(() => {
        if (sprints.length > 0 && !activeSprintId) {
            setActiveSprintId(defaultSprintId);
        }
    }, [sprints, defaultSprintId, activeSprintId]);

    const currentSprint = useMemo(() => {
        return sprints.find(s => s.id === activeSprintId) || null;
    }, [activeSprintId, sprints]);

    // isLatest is true if we are viewing anything that isn't a historical frozen snapshot from the past
    // But for the sake of labeling, let's treat the latest one with goals as "current"
    // isLatest: true when viewing the sprint whose date range contains today
    const currentSprintByDateId = useMemo(() => {
        const today = new Date().toISOString().split('T')[0];
        const active = sprints.find(s => s.startDate <= today && s.endDate >= today);
        return active ? active.id : sprints[sprints.length - 1]?.id ?? '';
    }, [sprints]);

    const isLatest = activeSprintId === currentSprintByDateId;

    return (
        <SprintContext.Provider value={{
            activeSprintId,
            setActiveSprintId,
            currentSprint,
            isLatest,
            sprints,
            isLoading
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
