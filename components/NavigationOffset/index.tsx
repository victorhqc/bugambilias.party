import React, { FC } from 'react';
import styles from './styles.module.css';

const NavigationHeader: FC = ({ children }) => <div className={styles.offset}>{children}</div>;

export default NavigationHeader;
