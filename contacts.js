import fs from "fs/promises";
import path from "path";
import { nanoid } from "nanoid";

// CommonJS: -> path.join(__dirname, 'contacts.json')
const contactsPath = path.resolve("db", "contacts.json");
console.log(contactsPath);

export const listContacts = async () => {
    try {
        const contactListBuffer = await fs.readFile(contactsPath);
        const contactList = JSON.parse(contactListBuffer.toString());

        if (!contactList.length) {
            return "Contact list is empty";
        }

        return contactList;
    } catch ({ message }) {
        return message;
    }
}

export const getContactById = async (contactId) => {
    try {
        const contactList = await listContacts();
        const targetContact = contactList.find(({ id }) => id === contactId);

        return targetContact || null;
    } catch ({ message }) {
        return message;
    }
}

export const addContact = async (name, email, phone) => {
    try {
        const contactList = await listContacts();
        const newContact = { id: nanoid(), name, email, phone };
        contactList.push(newContact);

        await fs.writeFile(contactsPath, JSON.stringify(contactList, null, 2));

        return newContact;
    } catch ({ message }) {
        return message;
    }
}

export const removeContact = async (contactId) => {
    try {
        const contactList = await listContacts();
        const contactIndex = contactList.findIndex(({ id }) => id === contactId);
        if (contactIndex === -1) {
            return null;
        }

        const [removedContact] = contactList.splice(contactIndex, 1);
        await fs.writeFile(contactsPath, JSON.stringify(contactList, null, 2));

        return removedContact;

    } catch ({ message }) {
        return message;
    }
}
