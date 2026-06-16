import { createClient } from '@supabase/supabase-js';

// Exact Supabase credentials provided by the user, cleaned of the /rest/v1/ path
const SUPABASE_URL = 'https://qemcgqsrodecaoadkpto.supabase.co';
const SUPABASE_KEY = 'sb_publishable_0KAwd1ZacacH7vNglTSVSA_bg6v-fYR';

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
