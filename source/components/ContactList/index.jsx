import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Typography } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import ActionDialog from '../ActionDialog';
import ContactItem from '../ContactItem';
import useStyles from './styles';

const ContactList = ({
  contacts, handleRemoveContact, selectable, onClick,
}) => {
  const { t } = useTranslation();

  const [open, setOpen] = useState(false);
  const [selectedContact, setSelectedContact] = useState(null);

  const classes = useStyles();

  return (
    <div className={classes.contactContainer}>
      {
        contacts.sort((a, b) => a.letter.localeCompare(b.letter)).map((item) => (
          <>
            <div className={classes.divider}>
              {item.letter}
            </div>
            {
              item.contacts.sort((a, b) => a.name.localeCompare(b.name)).map((contact) => (
                <ContactItem
                  contact={contact}
                  handleClick={selectable ? onClick : null}
                  handleDelete={selectable
                    ? null
                    : () => { setSelectedContact(contact); setOpen(true); }}
                />
              ))
            }
          </>
        ))
      }
      <div className={classes.line} />
      {
        open
        && (
          <ActionDialog
            open={open}
            title={t('contacts.deleteTitle')}
            content={<Typography>{t('contacts.deleteText')} <b>{selectedContact.name}</b>?</Typography>}
            button={t('contacts.deleteButton')}
            buttonVariant="danger"
            onClick={() => { handleRemoveContact(selectedContact); setOpen(false); }}
            onClose={() => setOpen(false)}
          />
        )
      }
    </div>
  );
};

export default ContactList;

ContactList.propTypes = {
  contacts: PropTypes.arrayOf(PropTypes.object).isRequired,
  handleRemoveContact: PropTypes.func.isRequired,
  onClick: PropTypes.func,
  selectable: PropTypes.bool,
};

ContactList.defaultProps = {
  onClick: null,
  selectable: false,
};