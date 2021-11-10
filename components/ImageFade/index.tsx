import React, { FC } from 'react';
import { withUserAgent } from '../UserAgent';
import ImageFader from './ImageFader';
import { DESKTOP_IMAGES, MOBILE_IMAGES } from './utils';

const ImageFade: FC<Props> = (props) => {
  if (props.isMobileDevice) {
    return <ImageFader {...props} images={MOBILE_IMAGES} />;
  }

  return <ImageFader {...props} images={DESKTOP_IMAGES} />;
};

type Props = {
  isMobileDevice: boolean;
};

export default withUserAgent(ImageFade);
