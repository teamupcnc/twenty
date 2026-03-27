import { LinkButton } from '@/design-system/components';
import type { LinkButtonType } from '@/design-system/components/Button/types/LinkButtonType';
import { theme } from '@/theme';
import { styled } from '@linaria/react';

const CTAsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${theme.spacing(4)};
  justify-content: center;
`;

export type HeroCTAsProps = { cta: LinkButtonType };

export function Cta({ cta }: HeroCTAsProps) {
  return (
    <CTAsContainer>
      <LinkButton
        key={`${cta.label}`}
        color="secondary"
        href={cta.href}
        label={cta.label}
        type="anchor"
        variant="contained"
      />
    </CTAsContainer>
  );
}
