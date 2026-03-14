const { processContact } = require("../services/contactService");

exports.identifyContact = async (req, res) => {
  try {
    const { email, phoneNumber } = req.body;

    const result = await processContact(email, phoneNumber);

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};