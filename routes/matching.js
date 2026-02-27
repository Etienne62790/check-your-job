import express from 'express';
import { supabase } from '../supabaseAdmin.js';
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const { offreId } = req.query;
    const { data: offre } = await supabase.from('offres').select('*').eq('id', offreId).single();
    const { data: candidats } = await supabase.from('candidats').select('*');

    const matches = candidats.map(c => {
      let score = 0;
      if (c.metiers.includes(offre.metier)) score += 1;
      if (c.departements.includes(offre.departement)) score += 1;
      return { id_candidat: c.id, id_offre: offre.id, score };
    });

    for (let m of matches) {
      await supabase.from('matching').upsert(m);
    }

    res.json(matches);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
