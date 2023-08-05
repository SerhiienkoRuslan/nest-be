'use client';

import { keyframes } from '@emotion/react';
import { FC } from 'react';

import { styled } from '@mui/material/styles';

const pushPopPushed = keyframes`
  0%, 72.5% {
     transform: translate(0, 0);
   }
   100% {
     transform: translate(0, 100%);
   }
`;

const pushPopFlip = keyframes`
  0% {
    transform: translate(0, 0) rotate(0deg);
  }
   50% {
     transform: translate(0, -80px) rotate(90deg);
  }
   100% {
     transform: translate(0, 0) rotate(180deg);
  }
`;

const pushPopSlide = keyframes`
  to {
    transform: translate(0, -100%) translate(80px, 0);
  }
`;

const LoaderWrapper = styled('div')({
  width: '100vw',
  height: '100vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

const Loader = styled('div')(({ theme }) => ({
  height: '100px',
  width: '100px',
  position: 'relative',
  overflow: 'hidden',
  '&:after, &:before': {
    backgroundColor: theme.palette.primary.main,
    bottom: 0,
    content: '""',
    height: '40px',
    position: 'absolute',
    width: '20px',
  },
  '&:before': {
    animation: `${pushPopPushed} calc(.85 * 1s) alternate-reverse infinite ease`,
    left: 0,
  },
  '&:after': {
    animation: `${pushPopPushed} calc(.85 * 1s) alternate infinite ease`,
    right: 0,
  },
}));

const LoaderItem1 = styled('div')(({ theme }) => ({
  height: '20px',
  width: '20px',
  position: 'absolute',
  animation: `${pushPopSlide} calc(.85 * 1s) infinite alternate ease-in-out`,
  transform: 'translate(0, -100%)',
  top: '100%',
  left: 0,
  '&:after': {
    backgroundColor: theme.palette.primary.main,
    animation: `${pushPopFlip} calc(.85 * 1s) infinite alternate ease-in-out`,
    content: '""',
    height: '100%',
    position: 'absolute',
    width: '100%',
  },
}));

const LoaderItem2 = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  height: '30px',
  left: '50%',
  position: 'absolute',
  top: '100%',
  transform: 'translate(-50%, -100%)',
  width: '20px',
}));

const RequestLoading: FC = () => {
  return (
    <LoaderWrapper>
      <Loader>
        <LoaderItem1 />
        <LoaderItem2 />
      </Loader>
    </LoaderWrapper>
  );
};

export default RequestLoading;
