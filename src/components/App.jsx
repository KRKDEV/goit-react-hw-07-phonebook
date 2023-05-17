import css from './App.module.css';
import Form from './Form/Form';
import Filter from './Filter/Filter';
import ContactList from './Contacts/Contacts';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  fetchContacts,
  addContact,
  deleteContact,
  selectContacts,
  selectIsLoading,
  selectError,
} from '../redux/contactsSlice';
import { setStatusFilter, selectStatusFilter } from 'redux/filtersSlice';

export const App = () => {
  const contacts = useSelector(selectContacts);
  const filter = useSelector(selectStatusFilter);
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  const handleSubmit = contact => {
    dispatch(addContact(contact));
  };

  const filterChange = event => {
    dispatch(setStatusFilter(event.target.value));
  };

  const filterContacts = () => {
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  };
  const handleDeleteContact = id => {
    dispatch(deleteContact(id));
  };

  const filteredContacts = filterContacts();
  return (
    <div className={css.container}>
      <h1>Phonebook</h1>
      <Form contacts={contacts} onSubmit={handleSubmit} />
      <h2>Contacts</h2>
      <Filter value={filter} onChange={filterChange} />
      {isLoading && !error && (
        <div className={css.info}>Request in progress...</div>
      )}
      {contacts.length === 0 && !isLoading && (
        <div className={css.info}>No contacts in phonebook.</div>
      )}
      {contacts.length > 0 && (
        <ContactList
          contacts={filteredContacts}
          onDelete={handleDeleteContact}
        />
      )}
    </div>
  );
};
