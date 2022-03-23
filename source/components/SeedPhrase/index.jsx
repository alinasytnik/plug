import React, { useState } from 'react';
import { ListItem } from '@ui';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import Tooltip from '@material-ui/core/Tooltip';
import clsx from 'clsx';
import useStyles from './styles';

const SeedPhrase = ({ words, ...other }) => {
  const classes = useStyles();
  const { t } = useTranslation();

  const [copied, setCopied] = useState(false);

  const copyText = t('copy.copyText');
  const copiedText = t('copy.copiedText');

  const [showTooltip, setShowTooltip] = useState(false);
  const [tooltipText, setTooltipText] = useState(copyText);

  const handleClick = () => {
    navigator.clipboard.writeText(words.join(' '));
    setCopied(true);
    setTooltipText(copiedText);

    setTimeout(() => {
      setCopied(false);
    }, 2500);

    setTimeout(() => {
      setTooltipText(copyText);
    }, 3000);
  };

  return (
    <Tooltip
      classes={{ tooltipPlacementTop: classes.tooltip }}
      title={tooltipText}
      arrow
      open={showTooltip || copied}
      placement="top"
    >
      <div
        onMouseOver={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        {...other}
        className={clsx(classes.root, other.className)}
        onClick={() => handleClick()}
      >
        {
          words.map((word, i) => (
            <div className={classes.item} key={word}>
              <ListItem number={i + 1} text={word} />
            </div>
          ))
        }
        {
          showTooltip
          && <div className={classes.layer} />
        }
      </div>
    </Tooltip>
  );
};

export default SeedPhrase;

SeedPhrase.propTypes = {
  words: PropTypes.arrayOf(PropTypes.string).isRequired,
};
