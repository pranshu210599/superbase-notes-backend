// Why: POST is used for creating resources; path /notes follows REST conventions; reads data from request body.

import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js';

serve(async (req) => {
  const supabase = createClient(
    Deno.env.get('SUPABASE_URL')!,
    Deno.env.get('SUPABASE_ANON_KEY')!,
    { global: { headers: { Authorization: req.headers.get('Authorization')! } } }
  );

  const { title, content } = await req.json();
  const { data: { user } } = await supabase.auth.getUser();

  const { data, error } = await supabase
    .from('notes')
    .insert({ title, content, user_id: user.id })
    .select();

  return new Response(JSON.stringify({ data, error }), {
    headers: { 'Content-Type': 'application/json' },
  });
});