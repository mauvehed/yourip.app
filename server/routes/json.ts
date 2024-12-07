import { defineEventHandler } from 'h3';
import { getClientIp } from '../utils/get-client-ip';

export default defineEventHandler((event) => {
  const userIp = getClientIp(event);
  return { ip: userIp };
});
