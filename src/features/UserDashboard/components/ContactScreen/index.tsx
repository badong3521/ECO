import React, { useEffect, useState } from 'react';
import { View, Linking, ScrollView } from 'react-native';
import Accordion from '../../../../components/Accordion';
import Loader from '../../../../components/Loader';
import Image from '../../../../components/Image';
import ContactItem from './components/ContactItem';
import ContactApi from '../../../../services/api/contact';
import { Contact } from '../../../../services/api/types/contact';
import { useUserState } from '../../../User/reducers';
import styles from './style.css';
import Firebase from '../../../../services/firebase';

export default function ContactScreen() {
  const [contacts, setContacts] = useState<Contact[]>();
  const [userState] = useUserState();
  const { userLanguage } = userState;

  async function initiateLoadContacts() {
    const fetchedContacts = await loadContacts();
    if (fetchedContacts) {
      setContacts(fetchedContacts!);
    }
  }

  useEffect(() => {
    initiateLoadContacts();
  }, []);

  return (
    <View style={styles.root}>
      {contacts ? (
        <ScrollView>
          {contacts.map((item: Contact) => (
            <Accordion
              title={item.name[userLanguage]}
              description={item.shortDescription[userLanguage]}
              left={() => renderLogo(item.logo)}
              style={styles.accordion}
              key={item.name[userLanguage]}
            >
              <ContactItem
                description={item.longDescription[userLanguage]}
                phoneNumber={item.phoneNumber}
                timeOpen={item.timeOpen}
                timeClose={item.timeClose}
                daysOpen={item.daysOpen}
                email={item.email}
                onPressCall={(phone: string) => onPressCall(phone)}
                onPressEmail={(email: string) => onPressEmail(email)}
              />
            </Accordion>
          ))}
        </ScrollView>
      ) : (
        <View style={styles.loaderContainer}>
          <Loader />
        </View>
      )}
    </View>
  );
}

function renderLogo(uri: string): React.ReactNode {
  return (
    <Image
      uri={uri}
      style={{
        height: 30,
        width: 30,
      }}
    />
  );
}

async function loadContacts(): Promise<Contact[] | null> {
  const api = new ContactApi();
  const response = await api.getContacts();

  if (response.status === 'success') {
    return response.result.data;
  }
  return null;
}

// Open phone app on user's device with given number
function onPressCall(number: string) {
  Firebase.track('contact_call', {
    type: 'tel',
    value: number,
  });
  Linking.openURL(`tel:${number}`);
}

// Navigate user to their preferred email service
function onPressEmail(email: string) {
  const mailTo = `mailto:${email}`;
  Firebase.track('contact_email', {
    type: 'email',
    value: email,
  });
  Linking.openURL(mailTo);
}
