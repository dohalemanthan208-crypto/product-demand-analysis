'use client';

import React, { createContext, useContext, useState } from 'react';

export interface DemandEntry {
  id: number;
  product: string;
  locality: string;
  demandStatus: 'high' | 'medium' | 'low';
  units: number;
  weekDate: string;
  notes: string;
  brand?: string;
  timestamp: number;
}

interface DataContextType {
  entries: DemandEntry[];
  addEntry: (entry: Omit<DemandEntry, 'id' | 'timestamp'>) => void;
  getEntriesByLocality: (locality: string) => DemandEntry[];
  getEntriesByProduct: (product: string) => DemandEntry[];
  getAllLocalities: () => string[];
  getAllProducts: () => string[];
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export function DataProvider({ children }: { children: React.ReactNode }) {
  const [entries, setEntries] = useState<DemandEntry[]>([
    // Sample data
    {
      id: 1,
      product: 'Milk',
      locality: 'Downtown',
      demandStatus: 'high',
      units: 450,
      weekDate: '2024-03-23',
      notes: 'High demand due to festivals',
      brand: 'Brand A',
      timestamp: Date.now() - 86400000 * 2,
    },
    {
      id: 2,
      product: 'Bread',
      locality: 'North Side',
      demandStatus: 'high',
      units: 320,
      weekDate: '2024-03-23',
      notes: 'Consistent demand',
      brand: 'Local Brand',
      timestamp: Date.now() - 86400000,
    },
    {
      id: 3,
      product: 'Rice',
      locality: 'Downtown',
      demandStatus: 'medium',
      units: 200,
      weekDate: '2024-03-23',
      notes: '',
      brand: 'Brand B',
      timestamp: Date.now() - 3600000,
    },
  ]);

  const addEntry = (entry: Omit<DemandEntry, 'id' | 'timestamp'>) => {
    const newEntry: DemandEntry = {
      ...entry,
      id: Date.now(),
      timestamp: Date.now(),
    };
    setEntries([newEntry, ...entries]);
  };

  const getEntriesByLocality = (locality: string): DemandEntry[] => {
    return entries.filter(
      (entry) => entry.locality.toLowerCase() === locality.toLowerCase()
    );
  };

  const getEntriesByProduct = (product: string): DemandEntry[] => {
    return entries.filter(
      (entry) => entry.product.toLowerCase() === product.toLowerCase()
    );
  };

  const getAllLocalities = (): string[] => {
    return [...new Set(entries.map((entry) => entry.locality))];
  };

  const getAllProducts = (): string[] => {
    return [...new Set(entries.map((entry) => entry.product))];
  };

  return (
    <DataContext.Provider
      value={{
        entries,
        addEntry,
        getEntriesByLocality,
        getEntriesByProduct,
        getAllLocalities,
        getAllProducts,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}

export function useDataContext() {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useDataContext must be used within DataProvider');
  }
  return context;
}
