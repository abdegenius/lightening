import { createAvatar } from "@dicebear/core";
import { dylan } from "@dicebear/collection";

export const AVATAR = (seed: any) => {
  const avatar = createAvatar(dylan, {
    seed,
  });
  const svg = avatar.toDataUri();
  return svg;
};
