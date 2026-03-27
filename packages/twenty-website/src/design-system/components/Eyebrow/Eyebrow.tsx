import { Heading } from '@/design-system/components/Heading/Heading';
import { HeadingType } from '@/design-system/components/Heading/types/Heading';
import { RectangleFillIcon } from '@/icons';
import { theme } from '@/theme';
import { css } from '@linaria/core';
import { styled } from '@linaria/react';

const EyebrowRow = styled.div`
  align-items: center;
  display: grid;
  gap: ${theme.spacing(2)};
  grid-template-columns: auto 1fr;
`;

const eyebrowColorPrimary = css`
  color: ${theme.colors.primary.text[60]};
`;

const eyebrowColorSecondary = css`
  color: ${theme.colors.secondary.text[60]};
`;

type EyebrowProps = {
  heading: HeadingType;
  colorScheme: 'primary' | 'secondary';
};

export function Eyebrow({ heading, colorScheme }: EyebrowProps) {
  const colorClassName =
    colorScheme === 'primary' ? eyebrowColorPrimary : eyebrowColorSecondary;

  return (
    <EyebrowRow>
      <RectangleFillIcon size={14} fillColor={theme.colors.highlight[100]} />
      <Heading
        as="h3"
        className={colorClassName}
        segments={{ fontFamily: heading.fontFamily, text: heading.text }}
        size="xs"
        weight="medium"
      />
    </EyebrowRow>
  );
}
