import pino from 'pino';
import dayjs from 'dayjs';

const logger = pino({
  transport: {
    target: 'pino-pretty',
    timestamp: () => `,'time':'${dayjs().format('DD/MM/YYYY')}'`,
    options: {
      colorize: true,
    },
  },
});

export default logger;
