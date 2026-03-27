import { HERO_DATA } from '@/app/(home)/constants/hero';
import { TRUSTED_BY_DATA } from '@/app/(home)/constants/trusted-by';
import { Image, LinkButton } from '@/design-system/components';
import { Pages } from '@/enums/pages';
import { Hero } from '@/sections/Hero/components';
import { TrustedBy } from '@/sections/TrustedBy/components';
import { theme } from '@/theme';

export default function HomePage() {
  return (
    <>
      <Hero.Root backgroundColor={theme.colors.primary.background[100]}>
        <Hero.Heading segments={HERO_DATA.heading} />
        <Hero.Body page={Pages.Home} body={HERO_DATA.body} size="sm" />
        <Hero.Cta>
          <LinkButton
            color="secondary"
            href="https://app.twenty.com/welcome"
            label="Get started"
            type="anchor"
            variant="contained"
          />
        </Hero.Cta>
        <Hero.Visual>
          <Image src="/images/home/hero/background.png" alt="" />
          <Image src="/images/home/hero/foreground.png" alt="" />;
        </Hero.Visual>
      </Hero.Root>

      <TrustedBy.Root>
        <TrustedBy.Separator separator={TRUSTED_BY_DATA.separator} />
        <TrustedBy.Logos
          clientCountLabel={TRUSTED_BY_DATA.clientCountLabel}
          logos={TRUSTED_BY_DATA.logos}
        />
      </TrustedBy.Root>
    </>
  );
}
