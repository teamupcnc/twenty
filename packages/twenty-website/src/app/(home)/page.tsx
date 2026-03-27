import { HERO_DATA } from '@/app/(home)/constants/hero';
import { Pages } from '@/enums/pages';
import { Hero } from '@/sections/Hero/components';
import { theme } from '@/theme';

export default function HomePage() {
  return (
    <>
      <Hero.Root backgroundColor={theme.colors.primary.background[100]}>
        <Hero.Heading segments={HERO_DATA.heading} />
        <Hero.Body page={Pages.Home} body={HERO_DATA.body} size="sm" />
        <Hero.Cta cta={HERO_DATA.cta} />
        <Hero.Visual />
      </Hero.Root>
    </>
  );
}
