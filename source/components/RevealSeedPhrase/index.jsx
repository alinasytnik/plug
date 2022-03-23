import React from 'react';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import WhiteKeyImage from '@assets/icons/white-key.svg';
import clsx from 'clsx';
import useStyles from './styles';

const RevealSeedPhrase = ({ onClick, ...other }) => {
  const { t } = useTranslation();
  const classes = useStyles();
  return (
    <div
      onClick={onClick}
      {...other}
      className={clsx(classes.root, other.className)}
    >
      <div className={classes.blur} />
      <div className={classes.center}>
        <img src={WhiteKeyImage} />
        <span className={classes.text}>{t('seedPhrase.reveal')}</span>
      </div>
    </div>
  );
};

export default RevealSeedPhrase;

RevealSeedPhrase.propTypes = {
  onClick: PropTypes.func.isRequired,
};
