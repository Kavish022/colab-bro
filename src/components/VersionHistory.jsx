import { History as HistoryIcon } from 'lucide-react';

export default function History({ history }) {
  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <div className="p-4 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 flex items-center gap-2">
        <HistoryIcon size={16} className="text-purple-600" />
        <span className="font-bold text-sm dark:text-white">History</span>
      </div>
      <div className="p-4 overflow-y-auto space-y-4">
        {history.map(item => (
          <div key={item.id} className="text-xs border-l-2 border-blue-500 pl-2">
            <div className="font-bold dark:text-gray-200">{item.action}</div>
            <div className="text-gray-400">{item.user} • {item.time}</div>
          </div>
        ))}
      </div>
    </div>
  );
}