import { defineEventHandler, getRequestHeaders } from 'h3';

export default defineEventHandler((event) => {
  const headers = getRequestHeaders(event);
  const userIp = headers['x-forwarded-for'] || event.node.req.socket.remoteAddress;
  return { ip: userIp };
});
