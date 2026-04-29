import 'react-native-url-polyfill/auto';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://lrxoalxpyomtcqzueqmb.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxyeG9hbHhweW9tdGNxenVlcW1iIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzc0Mjk5ODksImV4cCI6MjA5MzAwNTk4OX0.wQVhjAhT4p7hpifSbRlZaES1KjjtR7PiJkDa13MgViY';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
