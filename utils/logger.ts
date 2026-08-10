export enum LogLevel {
  DEBUG = 0,
  INFO = 1,
  WARN = 2,
  ERROR = 3,
  OFF = 4,
}

const LOG_LEVELS: Record<string, LogLevel> = {
  debug: LogLevel.DEBUG,
  info: LogLevel.INFO,
  warn: LogLevel.WARN,
  error: LogLevel.ERROR,
  off: LogLevel.OFF,
};

const currentLevel = LOG_LEVELS[(process.env.LOG_LEVEL || 'info').toLowerCase()] ?? LogLevel.INFO;

function timestamp(): string {
  return new Date().toISOString().replace('T', ' ').slice(0, 23);
}

export const logger = {
  debug: (...args: unknown[]) => {
    if (currentLevel <= LogLevel.DEBUG) console.log(`[${timestamp()}] [DEBUG]`, ...args);
  },
  info: (...args: unknown[]) => {
    if (currentLevel <= LogLevel.INFO) console.log(`[${timestamp()}] [INFO]`, ...args);
  },
  warn: (...args: unknown[]) => {
    if (currentLevel <= LogLevel.WARN) console.warn(`[${timestamp()}] [WARN]`, ...args);
  },
  error: (...args: unknown[]) => {
    if (currentLevel <= LogLevel.ERROR) console.error(`[${timestamp()}] [ERROR]`, ...args);
  },
};

export function logPageAction(page: string, action: string, ...details: unknown[]) {
  logger.debug(`[${page}] ${action}`, ...details);
}
