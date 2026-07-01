export const PUBLIC_DATA_ENV = {
  dataGoKr: 'DATA_GO_KR_SERVICE_KEY',
  youthCenter: 'YOUTH_CENTER_API_KEY',
  work24: 'WORK24_AUTH_KEY',
  careerNet: 'CAREER_NET_API_KEY',
} as const;

export function getEnv(key: string): string | undefined {
  const value = process.env[key]?.trim();
  return value || undefined;
}
