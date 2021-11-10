import React, { FC } from 'react';
import PropTypes from 'prop-types';
import { withUserAgent } from '../UserAgent';

import DesktopNavigationHeader from './DesktopNavigationHeader';
import MobileNavigationHeader from './MobileNavigationHeader';

const NavigationHeader: FC<Props> = (props) => {
  if (props.isMobileDevice) {
    return <MobileNavigationHeader {...props} />;
  }

  return <DesktopNavigationHeader {...props} />;
};

type Props = {
  isMobileDevice: boolean;
};

export default withUserAgent(NavigationHeader);
