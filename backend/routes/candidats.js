// Récupérer un candidat par ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const { data, error } = await supabase.from('candidats').select('*').eq('id', id).single();
  if (error) return res.status(400).json({ error: error.message });
  res.json(data);
});
