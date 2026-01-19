
import React from 'react';
import { DeviceConfig } from '../types';

interface DeviceFrameProps {
  device: DeviceConfig;
  url: string;
}

export const DeviceFrame: React.FC<DeviceFrameProps> = ({ device, url }) => {
  return (
    <div className="flex flex-col items-center gap-4 shrink-0 transition-all duration-300">
      <div className="flex items-center gap-3 bg-slate-800/50 px-4 py-2 rounded-full border border-slate-700 shadow-lg">
        <svg 
          className="w-5 h-5 text-blue-400" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={device.icon} />
        </svg>
        <span className="font-semibold text-slate-200">{device.name}</span>
        <span className="text-xs text-slate-400 bg-slate-900/50 px-2 py-0.5 rounded border border-slate-700">
          {device.width} × {device.height}
        </span>
      </div>

      <div 
        className="relative bg-white rounded-xl shadow-2xl ring-8 ring-slate-800 overflow-hidden"
        style={{ 
          width: `${device.width}px`, 
          height: `${device.height}px` 
        }}
      >
        {url ? (
          <iframe
            src={url}
            title={`${device.name} simulation`}
            className="w-full h-full border-none bg-white"
            sandbox="allow-same-origin allow-scripts allow-forms allow-popups"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center bg-slate-800 text-slate-500 text-center p-8">
            <svg className="w-16 h-16 mb-4 opacity-20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <p className="text-sm font-medium">Waiting for URL...</p>
          </div>
        )}
      </div>
    </div>
  );
};
