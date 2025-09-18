
import React from 'react';
import type { SavedSolution } from '../types';
import { HistoryIcon } from './Icons';

interface HistoryProps {
  history: SavedSolution[];
  onLoad: (item: SavedSolution) => void;
}

const History: React.FC<HistoryProps> = ({ history, onLoad }) => {
  return (
    <aside className="bg-gray-800/50 border border-gray-700 rounded-lg shadow-lg p-5 sticky top-8">
        <h2 className="flex items-center text-xl font-bold text-white mb-4">
            <HistoryIcon className="h-6 w-6 mr-2 text-cyan-500" />
            Saved Solutions
        </h2>
        {history.length === 0 ? (
            <p className="text-gray-400 text-sm">You haven't saved any solutions yet. Saved solutions will appear here for quick access.</p>
        ) : (
            <ul className="space-y-3 max-h-96 overflow-y-auto">
                {history.slice().reverse().map((item) => (
                    <li key={item.id}>
                        <button
                            onClick={() => onLoad(item)}
                            className="w-full text-left p-3 bg-gray-800 hover:bg-gray-700 rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                        >
                            <p className="text-sm font-medium text-gray-200 truncate">{item.solution.errorSummary}</p>
                            <p className="text-xs text-gray-500 mt-1">{new Date(item.timestamp).toLocaleString()}</p>
                        </button>
                    </li>
                ))}
            </ul>
        )}
    </aside>
  );
};

export default History;
