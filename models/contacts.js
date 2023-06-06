const {nanoid} = require("nanoid");
const fs = require('fs/promises');
const path = require('path');

const contactsPath = path.join(__dirname, "contacts.json");

async function listContacts() {
  try {
    const data = await fs.readFile(contactsPath, "utf8");
    const DataPars = JSON.parse(data);
    return DataPars;
  } catch (error) {
    console.error(error);
  }
}

async function getContactById(contactId) {
  try {
    const contacts = await listContacts();
    const result = contacts.find((item) => item.id === contactId.toString());
    return result || null;
  } catch (error) {
    console.error(error);
  }
}

async function removeContactById(contactId) {
  try {
    const contacts = await listContacts();
    const index = contacts.findIndex(
        (item) => item.id === contactId.toString()
    );
    if (index === -1) {
      return null;
    }
    const [result] = contacts.splice(index, 1);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return result;
  } catch (error) {
    console.error(error);
  }
}

async function updateContactById(id, data) {
  try {
    const contacts = await listContacts();
    const index = contacts.findIndex((item) => item.id === id);
    if (index === -1) {
      return null;
    }
    contacts[index] = {id, ...data};
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return contacts[index];
    } catch (error) {
      console.error(error);
    }

}
async function addContact({name, email, phone}) {
  try {
    const contacts = await listContacts();
    const newContact = {
      id: nanoid(),
      email,
      name,
      phone,
    };
    contacts.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return newContact;
  } catch (error) {
    console.error(error);
  }
}

module.exports = {
  listContacts,
  updateContactById,
  getContactById,
  removeContactById,
  addContact,
};
