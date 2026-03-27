import { theme } from '@/theme';
import { styled } from '@linaria/react';
import { ReactNode } from 'react';
const StyledVisual = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing(4)};
  width: 100%;
`;

type VisualProps = { children: ReactNode };

export function Visual({ children }: VisualProps) {
  return <StyledVisual>{children}</StyledVisual>;
}
