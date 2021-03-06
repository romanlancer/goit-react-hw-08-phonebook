import { useState, useEffect } from 'react';
import addSound from 'assets/add-sound.mp3';
import errorSound from 'assets/error-sound.mp3';
import Player from 'components/Player';
import { TiUserAddOutline, TiWarning } from 'react-icons/ti';
import { toast } from 'react-toastify';
import styles from './styles.module.css';
import {
  useCreateContactMutation,
  useGetContactsQuery,
} from 'Redux/contacts/contactsApi';

const Form = () => {
  const [createContact] = useCreateContactMutation();
  const { data } = useGetContactsQuery();
  const audio = new Audio(addSound);
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const [isDisabled, setIsDisabled] = useState(true);

  const reset = () => {
    setName('');
    setNumber('');
  };

  useEffect(() => {
    name.length > 0 && number.length > 0
      ? setIsDisabled(false)
      : setIsDisabled(true);
  }, [name, number]);

  const handleSubmit = e => {
    e.preventDefault();
    const contact = {
      name,
      number,
    };

    const contactFinder = data.find(
      contact => contact.name === name || contact.number === number
    );

    if (contactFinder) {
      toast.warn(`${name} ${number} is already in contacts.`, {
        icon: () => (
          <>
            <TiWarning size={30} color="var(--toastify-color-warning)" />
            <Player url={errorSound} />
          </>
        ),
      });
      audio.pause();
      return;
    }

    createContact(contact);

    reset();
  };

  const startPlaying = () => {
    audio.play();
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <label className={styles.label}>
        Name:
        <input
          className={styles.input}
          type="text"
          name="name"
          placeholder="john doe"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          value={name}
          onChange={e => setName(e.currentTarget.value)}
          required
        />
      </label>
      <label className={styles.label}>
        Number:
        <input
          className={styles.input}
          type="tel"
          placeholder="+380 33 333 3333"
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          value={number}
          name="number"
          onChange={e => setNumber(e.currentTarget.value)}
          required
        />
      </label>

      <button
        onClick={startPlaying}
        className={styles.submitButton}
        type="submit"
        disabled={isDisabled}
        aria-label="add contact button"
      >
        add contact
        <TiUserAddOutline size={20} className={styles.icon} />
      </button>
    </form>
  );
};

export default Form;
