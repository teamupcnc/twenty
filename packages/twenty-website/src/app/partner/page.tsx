import { TRUSTED_BY_DATA } from '@/app/(home)/constants/trusted-by';
import { HERO_DATA } from '@/app/partner/constants/hero';
import { LinkButton } from '@/design-system/components';
import { Pages } from '@/enums/pages';
import { Hero } from '@/sections/Hero/components';
import { TrustedBy } from '@/sections/TrustedBy/components';
import { theme } from '@/theme';

export default function PartnerPage() {
  return (
    <>
      <Hero.Root backgroundColor={theme.colors.primary.background[100]}>
        <Hero.Heading segments={HERO_DATA.heading} />
        <Hero.Body page={Pages.Partner} body={HERO_DATA.body} />
        <Hero.Cta>
          <LinkButton
            color="secondary"
            href="https://app.twenty.com/welcome"
            label="Become a partner"
            type="anchor"
            variant="outlined"
          />
          <LinkButton
            color="secondary"
            href="https://app.twenty.com/welcome"
            label="Find a partner"
            type="anchor"
            variant="contained"
          />
        </Hero.Cta>
        <Hero.Visual>
          <iframe
            src="https://app.endlesstools.io/embed/1c6c8259-3276-4cf2-84d8-6b7e87e7ec95"
            title="Endless Tools Editor"
            allow="clipboard-write; encrypted-media; gyroscope; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
            style={{
              width: '100%',
              height: '462px',
              border: 'none',
              backgroundColor: theme.colors.secondary.background[100],
              display: 'block',
            }}
          />
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
