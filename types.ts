
export interface DeviceConfig {
  id: string;
  name: string;
  width: number;
  height: number;
  icon: string;
}

export const DEVICES: DeviceConfig[] = [
  {
    id: 'mobile',
    name: 'Mobile',
    width: 375,
    height: 667,
    icon: 'M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z'
  },
  {
    id: 'tablet',
    name: 'Tablet',
    width: 768,
    height: 1024,
    icon: 'M12 18h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z'
  },
  {
    id: 'desktop',
    name: 'Desktop',
    width: 1280,
    height: 800,
    icon: 'M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z'
  }
];
