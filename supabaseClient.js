import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

const SUPABASE_URL = 'https://cwrtcnjnudfaamjkupgg.supabase.co';
const SUPABASE_ANON_KEY = 'VOTRE_CLE_ANON_ICI';

export const supabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
