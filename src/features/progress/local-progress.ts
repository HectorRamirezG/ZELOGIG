const STORAGE_KEY = "zelogig.progress.v1";

export interface LocalProgress { readonly completedLevelIds: readonly string[]; }

export function readProgress(): LocalProgress {
  if (typeof window === "undefined") return { completedLevelIds: [] };
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "{"completedLevelIds":[]}") as LocalProgress; }
  catch { return { completedLevelIds: [] }; }
}

export function completeLevel(levelId: string): LocalProgress {
  const current = readProgress();
  const completedLevelIds = Array.from(new Set([...current.completedLevelIds, levelId]));
  const next = { completedLevelIds };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  return next;
}
