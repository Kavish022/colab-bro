
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://yyigeswudnsiyevftttn.supabase.co';
const supabaseKey = 'sb_publishable_KjcjyjLLlB3nUdoQR_w2NA_5ZKqm659';

export const supabase = createClient(supabaseUrl, supabaseKey);

        