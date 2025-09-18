
import React, { useState, useEffect, useCallback } from 'react';
import type { Solution, SavedSolution } from './types';
import { getSolution } from './services/geminiService';
import { getHistory, saveSolution, findSolution } from './services/storageService';
import Header from './components/Header';
import ErrorInput from './components/ErrorInput';
import SolutionDisplay from './components/SolutionDisplay';
import History from './components/History';
import Loader from './components/Loader';
import { LightbulbIcon } from './components/Icons';

const App: React.FC = () => {
  const [errorLog, setErrorLog] = useState<string>('');
  const [solution, setSolution] = useState<Solution | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const [history, setHistory] = useState<SavedSolution[]>([]);
  const [isSolutionSaved, setIsSolutionSaved] = useState<boolean>(false);

  useEffect(() => {
    setHistory(getHistory());
  }, []);

  const handleResolveError = useCallback(async () => {
    if (!errorLog.trim()) {
      setApiError('Please paste an error log first.');
      return;
    }
    setIsLoading(true);
    setApiError(null);
    setSolution(null);
    setIsSolutionSaved(false);

    try {
      // Check local storage first
      const saved = findSolution(errorLog);
      if (saved) {
        setSolution(saved.solution);
        setIsSolutionSaved(true);
      } else {
        const result = await getSolution(errorLog);
        setSolution(result);
      }
    } catch (error) {
      console.error('Error resolving error:', error);
      setApiError(error instanceof Error ? error.message : 'An unknown error occurred.');
    } finally {
      setIsLoading(false);
    }
  }, [errorLog]);

  const handleSaveSolution = () => {
    if (!solution || !errorLog) return;
    const newSavedSolution: SavedSolution = {
      id: Date.now().toString(),
      errorLog: errorLog,
      solution: solution,
      timestamp: new Date().toISOString(),
    };
    saveSolution(newSavedSolution);
    setHistory(getHistory());
    setIsSolutionSaved(true);
  };

  const handleLoadFromHistory = (item: SavedSolution) => {
    setErrorLog(item.errorLog);
    setSolution(item.solution);
    setIsSolutionSaved(true);
    window.scrollTo(0, 0);
  };
  
  const handleClear = () => {
    setErrorLog('');
    setSolution(null);
    setApiError(null);
    setIsSolutionSaved(false);
  };

  return (
    <div className="min-h-screen bg-gray-900 font-sans p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Header />
          <main>
            <ErrorInput
              value={errorLog}
              onChange={(e) => setErrorLog(e.target.value)}
              onSubmit={handleResolveError}
              onClear={handleClear}
              isLoading={isLoading}
            />

            {isLoading && <Loader />}
            
            {apiError && (
              <div className="mt-6 bg-red-900/50 border border-red-700 text-red-300 px-4 py-3 rounded-lg" role="alert">
                <p className="font-bold">Error</p>
                <p>{apiError}</p>
              </div>
            )}

            {solution && !isLoading && (
              <SolutionDisplay 
                solution={solution} 
                onSave={handleSaveSolution}
                isSaved={isSolutionSaved}
              />
            )}

            {!solution && !isLoading && !apiError && (
                 <div className="mt-6 bg-gray-800/50 border border-gray-700 rounded-lg p-8 text-center">
                    <LightbulbIcon className="mx-auto h-12 w-12 text-cyan-500" />
                    <h3 className="mt-4 text-lg font-medium text-white">Welcome to DevErrorLog</h3>
                    <p className="mt-2 text-sm text-gray-400">
                        Paste your terminal error log in the box above and click "Resolve" to get an AI-powered explanation and solution.
                    </p>
                </div>
            )}
          </main>
        </div>
        <div className="lg:col-span-1">
          <History history={history} onLoad={handleLoadFromHistory} />
        </div>
      </div>
    </div>
  );
};

export default App;
