import { useState } from 'react'
import supabase from './config/supabaseClient'
import Footer from './components/Footer'

export default function Auth() {
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState('')

  const handleLogin = async (e) => {
    e.preventDefault()

    try {
      setLoading(true)
      const { error } = await supabase.auth.signInWithOtp({ email })
      if (error) throw error
      alert('Check your email for the login link!')
    } catch (error) {
      alert(error.error_description || error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex-wrapper">
      <div className="col-6 form-widget flex-container" aria-live="polite">
        <h1 className="description">
          QC Logger
        </h1>
        <i className="material-icons logo logo-auth">biotech</i>
        {loading ? (
          'Sending magic link...'
        ) : (
        <form className="login-form" onSubmit={handleLogin}>
          <h2 className="sign-in">Sign In</h2>
          <label htmlFor="email">Enter your email</label>
          <input
            id="email"
            className="inputField"
            type="email"
            placeholder="example@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button className="button block" aria-live="polite">
            Send magic link
          </button>
        </form>
        
        )}
      </div>
      <Footer />
    </div>
  )
}