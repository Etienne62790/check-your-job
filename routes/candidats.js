import express from 'express';
import multer from 'multer';
import fs from 'fs';
import { supabase } from '../supabaseAdmin.js';
import crypto from 'crypto';

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

router.post('/', upload.fields([{ name: 'cv' }, { name: 'lettre' }]), async (req, res) => {
  try {
    const { nom, prenom, email, telephone, adresse, metiers, departements, rqth, restrictions, experience, competences } = req.body;
    const candidatId = crypto.randomUUID();

    // Upload CV
    const cvFile = req.files.cv[0];
    const cvName = `cv_${candidatId}.pdf`;
    await supabase.storage.from('documents').upload(cvName, fs.createReadStream(cvFile.path), { upsert: true });
    const { data: cvData } = supabase.storage.from('documents').getPublicUrl(cvName);

    // Upload lettre
    const lettreFile = req.files.lettre[0];
    const lettreName = `lettre_${candidatId}.pdf`;
    await supabase.storage.from('documents').upload(lettreName, fs.createReadStream(lettreFile.path), { upsert: true });
    const { data: lettreData } = supabase.storage.from('documents').getPublicUrl(lettreName);

    const { data, error } = await supabase.from('candidats').insert([{
      id: candidatId,
      nom,
      prenom,
      email,
      telephone,
      adresse,
      metiers: JSON.parse(metiers),
      departements: JSON.parse(departements),
      rqth: rqth === 'true',
      restrictions,
      cv_url: cvData.publicUrl,
      lettre_url: lettreData.publicUrl,
      experience: parseInt(experience),
      competences: JSON.parse(competences)
    }]).select();

    if (error) return res.status(400).json({ error: error.message });
    res.json(data);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
