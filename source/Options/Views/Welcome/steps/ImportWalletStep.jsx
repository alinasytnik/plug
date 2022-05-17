import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import { useTranslation } from 'react-i18next';
import { Button, FormItem, TextInput } from '@ui';
import * as bip39 from 'bip39';

const ImportWalletStep = ({ handleNextStep, handleSetMnemonic }) => {
  const { t } = useTranslation();

  const [text, setText] = useState('');
  const [invalidMnemonic, setInvalidMnemonic] = useState(false);

  const handleChangeText = (e) => {
    setText(e.target.value);
    setInvalidMnemonic(false);
  };

  const handleImportMnemonic = () => {
    const isValid = bip39.validateMnemonic(text);
    if (isValid) {
      handleSetMnemonic(text);
      handleNextStep();
    } else {
      setInvalidMnemonic(true);
    }
  };

  const handleValidateMnemonic = () => (
    text === ''
    || text.trim().split(/\s+/g).length !== 12
    || invalidMnemonic
  );

  return (
    <>
      <Grid item xs={12}>
        <FormItem
          label={t('welcome.importLabel')}
          component={(
            <TextInput
              id="puppeteer-secret-recovery-phrase"
              fullWidth
              value={text}
              onChange={handleChangeText}
              type="text"
              multiline
              rows={4}
              error={invalidMnemonic}
            />
          )}
        />
      </Grid>
      <Grid item xs={12}>
        <Button
          id="puppeteer-import-wallet-confirm"
          variant="rainbow"
          value={t('welcome.importButton')}
          onClick={handleImportMnemonic}
          fullWidth
          disabled={handleValidateMnemonic()}
        />
      </Grid>
    </>
  );
};

export default ImportWalletStep;

ImportWalletStep.propTypes = {
  handleNextStep: PropTypes.func.isRequired,
  handleSetMnemonic: PropTypes.func.isRequired,
};
