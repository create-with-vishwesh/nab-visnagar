import { founderContent } from "./founderContent";
import { historyContent } from "./historyContent";
import { missionVision } from "./missionVision";
import { leadership } from "./leadership";
import { campusFacilities } from "./campusFacilities";

export const aboutContent = {
  en: {
    ...founderContent.en,
    ...historyContent.en,
    missionVisionValues: missionVision.en,
    leadership: leadership.en,
    campusFacilities: campusFacilities.en,
  },
  gu: {
    ...founderContent.gu,
    ...historyContent.gu,
    missionVisionValues: missionVision.gu,
    leadership: leadership.gu,
    campusFacilities: campusFacilities.gu,
  },
};