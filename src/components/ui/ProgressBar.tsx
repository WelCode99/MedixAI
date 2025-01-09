import React, { useEffect } from 'react';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

NProgress.configure({
  minimum: 0.1,
  showSpinner: false,
  trickleSpeed: 200,
  easing: 'ease-in-out',
  speed: 200
});

interface ProgressBarProps {
  isLoading: boolean;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ isLoading }) => {
  useEffect(() => {
    if (isLoading) {
      NProgress.start();
    } else {
      NProgress.done();
    }
  }, [isLoading]);

  return null;
}