import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import BackIcon from '@assets/icons/back.svg';
import { Layout, IDInput } from '@components';
import { TABS, useRouter } from '@components/Router';
import {
  Header, LinkButton, Container, FormItem, Select, Button, Alert,
} from '@ui';
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { validatePrincipalId } from '@shared/utils/ids';
import { HANDLER_TYPES, sendMessage } from '@background/Keyring';
import { setSelectedNft, setNfts } from '@redux/nfts';

const useStyles = makeStyles(() => ({
  appearAnimation: {
    animationName: '$appear',
    animationDuration: '0.5s',
  },
  nftImage: {
    height: 42,
    width: 42,
    borderRadius: 5,
  },
}));

const SendNFT = () => {
  const { t } = useTranslation();
  const [address, setAddress] = useState(null);
  const [loading, setLoading] = useState(false);
  const { navigator } = useRouter();
  const [error, setError] = useState(false);
  const dispatch = useDispatch();
  const { selectedNft: nft, nfts } = useSelector((state) => state.nfts);
  const classes = useStyles();
  const transferNFT = () => {
    setLoading(true);
    setError(false);
    sendMessage({ type: HANDLER_TYPES.TRANSFER_NFT, params: { nft, to: address } },
      (success) => {
        setLoading(false);
        if (success) {
          dispatch(setNfts(nfts.filter((token) => token.id !== nft.id)));
          dispatch(setSelectedNft(null));
          navigator.navigate('home', TABS.NFTS);
        } else {
          setError(true);
        }
      });
  };
  const handleAddressChange = (val) => setAddress(val);
  useEffect(() => {
    if (!nft) {
      navigator.navigate('home', TABS.NFTS);
    }
  }, [nft]);
  return (
    <Layout>
      <Header
        left={<LinkButton value={t('common.back')} onClick={() => navigator.navigate('nft-details')} startIcon={BackIcon} />}
        center={t('nfts.send')}
        right={<LinkButton value={t('common.close')} onClick={() => navigator.navigate('home')} />}
      />
      <Container>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <FormItem
              label={t('nfts.nft')}
              component={(
                <Select
                  image={nft?.url}
                  name={nft?.name}
                  text={`#${nft?.id}`}
                  imageClassName={classes.nftImage}
                  readonly
                  shadow
                />
              )}
            />
          </Grid>
          <Grid item xs={12}>
            <FormItem
              label={t('nfts.sendTo')}
              component={(
                <IDInput
                  value={address}
                  onChange={handleAddressChange}
                  isValid={address === null || validatePrincipalId(address)}
                  placeholder={t('nfts.inputPrincipalId')}
                />
              )}
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              variant="rainbow"
              value={t('common.continue')}
              fullWidth
              disabled={
                address === null
                || !validatePrincipalId(address)
                || address === ''
              }
              onClick={transferNFT}
              loading={loading}
            />
          </Grid>
          {error && (
            <Grid item xs={12}>
              <div className={classes.appearAnimation}>
                <Alert
                  type="danger"
                  title={(
                    <span>{t('nfts.transferError')}</span>
                  )}
                />
              </div>
            </Grid>
          )}
        </Grid>
      </Container>
    </Layout>
  );
};

export default SendNFT;
