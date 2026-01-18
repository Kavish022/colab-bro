import React from 'react';

export default function VersionHistory({ versionHistory }) {
  return (
    <div className="h-64 overflow-auto">
      <div className="px-4 py-3 bg-gray-50 border-b border-gray-200">
        <span className="font-semibold text-gray-900">Version History</span>
      </div>
      <div className="p-4 space-y-3">
        {versionHistory.map(version => (
          <div key={version.id} className="text-sm">
            <div className="font-medium text-gray-900">{version.user}</div>
            <div className="text-gray-600">{version.action}</div>
            <div className="text-gray-400 text-xs mt-1">{version.time}</div>
          </div>
        ))}
      </div>
    </div>
  );
}