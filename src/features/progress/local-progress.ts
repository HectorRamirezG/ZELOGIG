const STORAGE_KEY = "zelogig.progress.v1";

export interface LocalProgress { readonly completedLevelIds: readonly string[]; }

export function readProgress(): LocalProgress {
  if (typeof window === "undefined") return { completedLevelIds: [] };
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return { completedLevelIds: [] };

  try {
    const parsed = JSON.parse(raw) as LocalProgress;
    if (!parsed || !Array.isArray(parsed.completedLevelIds)) return { completedLevelIds: [] };
    return { completedLevelIds: parsed.completedLevelIds };
  }
  catch {
    return { completedLevelIds: [] };
  }
}

export function completeLevel(levelId: string): LocalProgress {
  const current = readProgress();
  const completedLevelIds = Array.from(new Set([...current.completedLevelIds, levelId]));
  const next = { completedLevelIds };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  return next;
}
