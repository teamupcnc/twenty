import { BodyType } from '@/design-system/components/Body/types/Body';
import type { LinkButtonType } from '@/design-system/components/Button/types/LinkButtonType';
import { HeadingType } from '@/design-system/components/Heading/types/Heading';

export type HeroDataType = {
  heading: HeadingType[];
  body: BodyType;
  cta: LinkButtonType;
};
