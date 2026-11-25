import type { ZhSagaOverlay } from './zhTypes';
import { ZH_ASCENSION_PART_2A } from './zhAscensionPart2A';
import { ZH_ASCENSION_PART_2B } from './zhAscensionPart2B';

export const ZH_ASCENSION_PART_2: Record<string, ZhSagaOverlay> = {
  ...ZH_ASCENSION_PART_2A,
  ...ZH_ASCENSION_PART_2B,
};
