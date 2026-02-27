import express from 'express';
import { supabase } from '../supabaseAdmin.js';
const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const { titre, description, metier, departement, id_employeur } = req.body;
    const { data, error } = await supabase.from('offres').insert([{
      titre,
      description,
      metier,
      departement,
      id_employeur
    }]).select();

    if (error) return res.status(400).json({ error: error.message });
    res.json(data);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
