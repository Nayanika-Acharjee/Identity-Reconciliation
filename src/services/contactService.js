const Contact = require("../models/contact");


exports.processContact = async (email, phoneNumber) => {

  // matching contacts
  const contacts = await Contact.find({
    $or: [
      { email: email },
      { phoneNumber: phoneNumber }
    ]
  });

  // If no contact exists → create primary
  if (contacts.length === 0) {

    const newContact = await Contact.create({
      email,
      phoneNumber,
      linkPrecedence: "primary"
    });

    return {
      contact: {
        primaryContactId: newContact._id,
        emails: [email],
        phoneNumbers: [phoneNumber],
        secondaryContactIds: []
      }
    };
  }

  //  Find primary contact
  let primary = contacts.find(c => c.linkPrecedence === "primary");

  if (!primary) {
    primary = await Contact.findById(contacts[0].linkedId);
  }

  //  Create secondary if new info
  const emailExists = contacts.some(c => c.email === email);
  const phoneExists = contacts.some(c => c.phoneNumber === phoneNumber);

  if (!emailExists || !phoneExists) {

    await Contact.create({
      email,
      phoneNumber,
      linkedId: primary._id,
      linkPrecedence: "secondary"
    });

  }

  //  Get all related contacts
  const relatedContacts = await Contact.find({
    $or: [
      { _id: primary._id },
      { linkedId: primary._id }
    ]
  });

  const emails = [...new Set(relatedContacts.map(c => c.email).filter(Boolean))];
  const phones = [...new Set(relatedContacts.map(c => c.phoneNumber).filter(Boolean))];

  const secondaryIds = relatedContacts
    .filter(c => c.linkPrecedence === "secondary")
    .map(c => c._id);

  return {
    contact: {
      primaryContactId: primary._id,
      emails,
      phoneNumbers: phones,
      secondaryContactIds: secondaryIds
    }
  };
};