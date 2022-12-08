import { createClient } from "@supabase/supabase-js"

const options = {
  db: {
    schema: 'public',
  },
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  },
  global: {
    headers: { 'x-my-custom-header': 'my-app-name' },
  },
}

export const supabase = createClient(
  "https://drgpwolmrquoffzanlnl.supabase.co", 
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRyZ3B3b2xtcnF1b2ZmemFubG5sIiwicm9sZSI6ImFub24iLCJpYXQiOjE2Njk5MDI1ODAsImV4cCI6MTk4NTQ3ODU4MH0.EMx0VAICs6EjBkktD5ns8zLHeGnR283kdcchCEwdQuE",
  options
  )