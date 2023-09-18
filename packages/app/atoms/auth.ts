import { atom, useAtom } from 'jotai';
import type { Session } from '@supabase/supabase-js';

const sessionAtom = atom<Session | null>(null);

export function useSession() {
  return [...useAtom(sessionAtom)] as const;
}

const isLoadingSessionAtom = atom(true);

export function useIsLoadingSession() {
  return [...useAtom(isLoadingSessionAtom)] as const;
}
