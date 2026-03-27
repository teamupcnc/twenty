import { Image } from '@/design-system/components';
import { theme } from '@/theme';
import { styled } from '@linaria/react';

const HERO_BACKGROUND_SRC = '/images/home/hero/background.png';
const HERO_FOREGROUND_SRC = '/images/home/hero/foreground.png';

const StyledVisual = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing(4)};
  width: 100%;
`;

const StyledImage = styled(Image)`
  width: 100%;
`;

export function Visual() {
  return (
    <StyledVisual>
      <StyledImage alt="" src={HERO_BACKGROUND_SRC} />
      <StyledImage alt="" src={HERO_FOREGROUND_SRC} />
    </StyledVisual>
  );
}
