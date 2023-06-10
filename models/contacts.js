const {nanoid} = require("nanoid");
const fs = require('fs/promises');
const path = require('path');
const contactsPath = path.join(__dirname, "contacts.json");

async function listContacts() {
    const data = await fs.readFile(contactsPath, "utf8");
    const DataPars = JSON.parse(data);
    return DataPars;
}

async function getContactById(contactId) {
    const contacts = await listContacts();
    const result = contacts.find((item) => item.id === contactId.toString());
    return result || null;
}

async function removeContactById(contactId) {
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
}

async function updateContactById(id, data) {
    const contacts = await listContacts();
    const index = contacts.findIndex((item) => item.id === id);
    if (index === -1) {
      return null;
    }
    contacts[index] = {id, ...data};
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return contacts[index];
}
async function addContact({name, email, phone}) {
  const contacts = await listContacts();
  const newContact = {
    id: nanoid(),
    name,
    email,
    phone,
  };
  contacts.push(newContact);
  await updateContactById(contacts);
  return newContact;
}

module.exports = {
  listContacts,
  updateContactById,
  getContactById,
  removeContactById,
  addContact,
};
