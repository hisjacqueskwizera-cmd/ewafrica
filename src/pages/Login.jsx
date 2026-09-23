import { Eye, EyeOff, Lock, Mail, User } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { CONTACT_INFO } from '../data/siteContent.js'
import { GoogleIcon } from '../components/social-icons.jsx'

const inputWrapClass =
  'flex items-center gap-2.5 rounded-lg border border-border bg-background px-3.5 focus-within:outline-2 focus-within:outline-copper'
const inputClass =
  'w-full bg-transparent py-2.5 text-sm text-primary placeholder:text-muted-foreground/70 focus:outline-none'

function Field({ label, children }) {
  return (
    <label className="block">
      <span className="text-sm font-semibold text-primary">{label}</span>
      <div className={`mt-1.5 ${inputWrapClass}`}>{children}</div>
    </label>
  )
}

function PasswordField({ label, value, onChange, placeholder, autoComplete }) {
  const [visible, setVisible] = useState(false)
  return (
    <Field label={label}>
      <Lock className="size-4 shrink-0 text-muted-foreground" aria-hidden="true" />
      <input
        required
        type={visible ? 'text' : 'password'}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        autoComplete={autoComplete}
        minLength={8}
        className={inputClass}
      />
      <button
        type="button"
        onClick={() => setVisible((v) => !v)}
        aria-label={visible ? 'Hide password' : 'Show password'}
        className="shrink-0 text-muted-foreground hover:text-copper"
      >
        {visible ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
      </button>
    </Field>
  )
}

/**
 * Shared Login/Signup page — a photo on the left (hidden below lg, where
 * there's no room for it) and the form on the right, matching the split
 * layout requested. `mode` swaps the heading, fields and submit label; the
 * footer link swaps `mode` by navigating between /login and /signup rather
 * than toggling local state, so the URL always reflects what's on screen
 * and either page can be linked to directly.
 *
 * There's no auth backend behind this yet (no user database, session, or
 * real Google OAuth client — the same "UI is real, integration isn't yet"
 * state as the Travel Planner flow's payment step, see the note on
 * BRAND_COLORS in pages/travel-planner/Payment.jsx). Submitting either form
 * simply moves on to the homepage rather than dead-ending the visitor, the
 * same way that step does with no processor wired up. Wire up a real
 * identity provider (and swap the Google button for real OAuth) before
 * this collects real passwords.
 */
function AuthPage({ mode }) {
  const isLogin = mode === 'login'
  const navigate = useNavigate()

  useEffect(() => {
    document.title = `${isLogin ? 'Log In' : 'Sign Up'} | East-West Africa Link`
  }, [isLogin])

  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    navigate('/')
  }

  return (
    <div className="grid min-h-svh pt-[84px] lg:grid-cols-2">
      <div className="relative hidden lg:block">
        <img
          src="/Pictures/Hero_Trv_PLNR.PNG"
          alt="A veranda table with a map of Africa, compass and journal overlooking Mount Kilimanjaro at sunrise"
          className="absolute inset-0 size-full object-cover"
        />
        <div
          className="absolute inset-0 bg-linear-to-t from-cocoa/90 via-cocoa/20 to-cocoa/10"
          aria-hidden="true"
        />
        <div className="relative flex h-full flex-col justify-between p-10 text-primary-foreground xl:p-14">
          <Link to="/" className="inline-flex w-fit items-center" aria-label="East-West Africa Link home">
            <img src="/Logos/New_logo/Logo_White.webp" alt="East-West Africa Link" className="h-14 w-auto" />
          </Link>
          <blockquote className="max-w-md">
            <p className="font-display text-2xl italic leading-snug xl:text-3xl">
              "Real places. Real people. A more meaningful Africa."
            </p>
            <p className="mt-4 text-sm text-primary-foreground/80">
              Sign in to pick up where you left off, or create an account to save your trip planning.
            </p>
          </blockquote>
        </div>
      </div>

      <div className="flex items-center justify-center bg-cream px-4 py-16 sm:px-6 lg:px-10">
        <div className="w-full max-w-sm">
          <span className="section-eyebrow">{isLogin ? 'Welcome Back' : 'Get Started'}</span>
          <h1 className="mt-2 font-display text-[clamp(1.75rem,3.5vw,2.5rem)] font-normal leading-[1.15] text-primary">
            {isLogin ? 'Log In to Your Account' : 'Create Your Account'}
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            {isLogin
              ? 'Welcome back — log in to continue planning your journey across Africa.'
              : 'Create an account to save your trip details and pick up where you left off.'}
          </p>

          <button
            type="button"
            className="mt-7 flex w-full items-center justify-center gap-3 rounded-full border border-border bg-background px-5 py-3 text-sm font-semibold text-primary shadow-card transition-colors hover:bg-card"
          >
            <GoogleIcon className="size-4.5" />
            Continue with Google
          </button>

          <div className="my-6 flex items-center gap-3">
            <span className="h-px flex-1 bg-border" aria-hidden="true" />
            <span className="text-xs font-semibold uppercase tracking-[0.1em] text-muted-foreground">
              Or continue with email
            </span>
            <span className="h-px flex-1 bg-border" aria-hidden="true" />
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {!isLogin && (
              <Field label="Full Name">
                <User className="size-4 shrink-0 text-muted-foreground" aria-hidden="true" />
                <input
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Enter your full name"
                  autoComplete="name"
                  className={inputClass}
                />
              </Field>
            )}

            <Field label="Email Address">
              <Mail className="size-4 shrink-0 text-muted-foreground" aria-hidden="true" />
              <input
                required
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                autoComplete="email"
                className={inputClass}
              />
            </Field>

            <PasswordField
              label="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder={isLogin ? 'Enter your password' : 'Create a password'}
              autoComplete={isLogin ? 'current-password' : 'new-password'}
            />

            {isLogin ? (
              <div className="flex justify-end">
                <Link to="/#contact" className="text-xs font-semibold text-copper hover:underline">
                  Forgot password?
                </Link>
              </div>
            ) : (
              <PasswordField
                label="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Re-enter your password"
                autoComplete="new-password"
              />
            )}

            <button type="submit" className="btn-copper w-full justify-center">
              {isLogin ? 'Log In' : 'Create Account'}
            </button>
          </form>

          {!isLogin && (
            <p className="mt-4 text-xs leading-relaxed text-muted-foreground">
              By creating an account, you agree to our{' '}
              <Link to="/terms-and-conditions" className="text-copper hover:underline">
                Terms &amp; Conditions
              </Link>{' '}
              and{' '}
              <Link to="/privacy-policy" className="text-copper hover:underline">
                Privacy Policy
              </Link>
              .
            </p>
          )}

          <p className="mt-8 text-center text-sm text-muted-foreground">
            {isLogin ? "Don't have an account? " : 'Already have an account? '}
            <Link
              to={isLogin ? '/signup' : '/login'}
              className="font-semibold text-copper hover:underline"
            >
              {isLogin ? 'Sign up' : 'Log in'}
            </Link>
          </p>

          <p className="mt-4 text-center text-xs text-muted-foreground">
            Need help?{' '}
            <a href={CONTACT_INFO.emailHref} className="text-copper hover:underline">
              Contact us
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}

export function Login() {
  return <AuthPage mode="login" />
}

export function Signup() {
  return <AuthPage mode="signup" />
}
