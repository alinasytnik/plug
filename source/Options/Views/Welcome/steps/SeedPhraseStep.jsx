import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import { useTranslation } from 'react-i18next';
import { Button, Checkbox } from '@ui';
import { SeedPhrase, RevealSeedPhrase } from '@components';
import useStyles from '../styles';

const SeedPhraseStep = ({ handleNextStep, mnemonic }) => {
  const { t } = useTranslation();
  const [checked, setChecked] = useState(false);
  const [reveal, setReveal] = useState(false);
  const classes = useStyles();

  const handleChangeCheckbox = (event) => { setChecked(event.target.checked); };

  if (mnemonic) {
    return (
      <>
        <Grid item xs={12} style={{ height: 185, position: 'relative' }}>
          {
            !reveal
            && (
              <>
                <RevealSeedPhrase
                  className="puppeteer-reveal-seed-phrase"
                  onClick={() => setReveal(true)}
                  style={{
                    position: 'absolute',
                    zIndex: 3,
                    margin: 'auto',
                    inset: 0,
                  }}
                />
                <div className={classes.blur} />
              </>
            )
          }
          <SeedPhrase words={mnemonic.split(' ')} className="puppeteer-seed-phrase" />
        </Grid>
        <Grid item xs={12}>
          <Checkbox style={{ margin: 0 }} checked={checked} handleChange={handleChangeCheckbox} label={t('welcome.seedCheckbox')} className="puppeteer-seed-phrase-checkbox" />
        </Grid>
        <Grid item xs={12}>
          <Button
            className="puppeteer-seed-phrase-continue-btn"
            variant="rainbow"
            value={t('common.continue')}
            onClick={handleNextStep}
            fullWidth
            disabled={!checked || !reveal}
          />
        </Grid>
      </>
    );
  }

  return null;
};

export default SeedPhraseStep;

SeedPhraseStep.defaultProps = {
  mnemonic: null,
};

SeedPhraseStep.propTypes = {
  handleNextStep: PropTypes.func.isRequired,
  mnemonic: PropTypes.arrayOf(PropTypes.string),
};
