import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getContact, deleteContact } from 'redux/operations/operations';
import { ColorRing } from 'react-loader-spinner';
import {
  selectContact,
  selectFilter,
  selectIsLoading,
} from 'redux/selectors/selectors';

export default function ContactList() {
  const valueContacts = useSelector(selectContact);
  const filterValue = useSelector(selectFilter);
  const isLoading = useSelector(selectIsLoading);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getContact());
  }, [dispatch]);

  const filtered =
    valueContacts.length > 0
      ? valueContacts.filter(contact => {
          return contact.name.toLowerCase().includes(filterValue.toLowerCase());
        })
      : [];

  return (
    <ul>
      {isLoading && (
        <ColorRing
          visible={true}
          height="80"
          width="80"
          ariaLabel="blocks-loading"
          wrapperStyle={{}}
          wrapperClass="blocks-wrapper"
          colors={['#849b87', '#849b87', '#849b87', '#849b87', '#849b87']}
        />
      )}
      {!isLoading &&
        filtered.length > 0 &&
        filtered.map(contact => {
          return (
            <li key={contact.id} id={contact.id}>
              {`${contact.name} - ${contact.number}`}
              <button
                type="text"
                onClick={e => {
                  dispatch(deleteContact(e.target.parentElement.id));
                }}
              >
                delete
              </button>
            </li>
          );
        })}
      {/* {filtered.length > 0 &&
        filtered.map(contact => {
          return (
            <li key={contact.id} id={contact.id}>
              {`${contact.name} - ${contact.number}`}
              <button
                type="text"
                onClick={e => {
                  dispatch(deleteContact(e.target.parentElement.id));
                }}
              >
                delete
              </button>
            </li>
          );
        })} */}
    </ul>
  );
}
