import cache from 'memory-cache';

const SESSION_TIMEOUT = 24 * 60 * 60 * 1000;

export const createSession = (fingerprint: string) => {
  if (!cache.get(fingerprint)) {
    cache.put(fingerprint, {messages: []}, SESSION_TIMEOUT);
  }
};

export const getSession = (fingerprint: string) => {
  return cache.get(fingerprint) || {messages: []};
};

export const updateSession = (fingerprint: string, messages: any[]) => {
  cache.put(fingerprint, {messages}, SESSION_TIMEOUT);
};
