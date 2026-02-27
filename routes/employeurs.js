import express from 'express';
import multer from 'multer';
import fs from 'fs';
import { supabase } from '../supabaseAdmin.js';
import crypto from 'crypto';

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

router.post('/', upload.single('logo'), async (req, res) => {
  try {
    const { nom, email, telephone, adresse, site_web } = req.body;
    const employeurId = crypto.randomUUID();

    const logoFile = req.file;
    const logoName = `logo_${employeurId}.png`;
    await supabase.storage.from('documents').upload(logoName, fs.createReadStream(logoFile.path), { upsert: true });
    const { data: logoData } = supabase.storage.from('documents').getPublicUrl(logoName);

    const { data, error } = await supabase.from('employeurs').insert([{
      id: employeurId,
      nom,
      email,
      telephone,
      adresse,
      site_web,
      logo_url: logoData.publicUrl
    }]).select();

    if (error) return res.status(400).json({ error: error.message });
    res.json(data);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
