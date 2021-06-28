// import PenIcon from '@assets/icons/settings/pen.svg';
import KeyIcon from '@assets/icons/settings/old-key.svg';
import NotebookIcon from '@assets/icons/settings/notebook.svg';
import { useTranslation } from 'react-i18next';
import { useRouter } from '@components/Router';
import browser from 'webextension-polyfill';

const useSettingsItems = () => {
  const { navigator } = useRouter();
  const { t } = useTranslation();

  return [
    /*
    {
      image: PenIcon,
      name: t('settings.walletDetails'),
      description: t('settings.walletDetailsDescription'),
      onClick: (() => navigator.navigate('wallet-details')),
    },
    */
    {
      image: NotebookIcon,
      name: t('settings.contacts'),
      description: t('settings.contactsDescription'),
      onClick: (() => navigator.navigate('contacts')),
    },
    {
      image: KeyIcon,
      name: t('settings.seedPhrase'),
      description: t('settings.seedPhraseDescription'),
      onClick: (() => navigator.navigate('seed-phrase')),
    },
    {
      image: KeyIcon,
      name: 'Create/Import account screen',
      description: '',
      onClick: (() => browser.tabs.create({ url: 'options.html' })),
    },
  ];
};

export default useSettingsItems;
