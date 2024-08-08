const Intervention = require('../models/intervention.model');

exports.addIntervention = async (req, res) => {
    const { client, type, date, technician, status, description } = req.body;
    console.log(client, type, date, technician, status, description);

debugger;
    if (!client || !type || !date || !technician || !status || !description) {
        return res.status(400).json({ error: true, message: "All fields are required" });
    }

    const intervention = new Intervention({ client, type, date, technician, status, description });
    await intervention.save();

    return res.json({ error: false, intervention, message: "Intervention added successfully" });
};

exports.getInterventions = async (req, res) => {
    const interventions = await Intervention.find().populate('client').populate('technician');
    return res.json({ error: false, interventions });
};

exports.getInterventionById = async (req, res) => {
    const intervention = await Intervention.findById(req.params.id).populate('client').populate('technician');
    if (!intervention) {
        return res.status(404).json({ error: true, message: "Intervention not found" });
    }
    return res.json({ error: false, intervention });
};
