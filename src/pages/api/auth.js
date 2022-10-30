//Setting cookies, creating, removing
import supabase from "../../config/supabaseClient";

//Helper function provided by supabase for setting and clearing the cookie.
//We will call this from App.js
export default function handler(req, res) {
    supabase.auth.resetPasswordForEmail.setAuthCookie(req, res)
}