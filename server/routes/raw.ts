import { defineEventHandler, getRequestHeaders } from 'h3';

export default defineEventHandler((event) => {
  const headers = getRequestHeaders(event);

  // Extract the X-Forwarded-For header
  const forwardedFor = headers['x-forwarded-for'] || '';

  // Take the leftmost (original client) IP and sanitize it
  const userIp = forwardedFor.split(',')[0]?.trim() || event.node.req.socket.remoteAddress;

  // Validate the IP address (simple regex for IPv4/IPv6)
  const isValidIp = /^(\d{1,3}\.){3}\d{1,3}$|^[0-9a-fA-F:]+$/.test(userIp);
  const safeIp = isValidIp ? userIp : 'Invalid IP';

  return safeIp;
});
