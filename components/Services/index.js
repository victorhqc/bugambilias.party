import React from 'react';
import PropTypes from 'prop-types';
import { SERVICES } from './utils';
import styles from './styles.module.css';

const ServiceItem = ({ src, title }) => (
  <div className={styles.wrapper}>
    <img className={styles.img} src={src} width="150px" />
    <p className={styles.text}>{title}</p>
  </div>
);

ServiceItem.propTypes = {
  src: PropTypes.string,
  title: PropTypes.string,
};

const Services = () => (
  <div className={styles.flex__wrapper}>
    {SERVICES.map((service) => (
      <ServiceItem key={service.title} {...service} />
    ))}
  </div>
);

export default Services;
