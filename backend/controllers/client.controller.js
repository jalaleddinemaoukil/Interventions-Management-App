const Client = require('../models/client.model');

exports.addClient = async (req, res) => {
    const { name, address, contact } = req.body;

    if (!name || !address || !contact) {
        return res.status(400).json({ error: true, message: "All fields are required" });
    }

    const client = new Client({ name, address, contact });
    await client.save();

    return res.json({ error: false, client, message: "Client added successfully" });
};

exports.getClients = async (req, res) => {
    const clients = await Client.find();
    return res.json({ error: false, clients });
};

exports.getClientById = async (req, res) => {
    const client = await Client.findById(req.params.id);
    if (!client) {
        return res.status(404).json({ error: true, message: "Client not found" });
    }
    return res.json({ error: false, client });
};
