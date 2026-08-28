import { useState, type FormEvent } from "react";
import { ArrowLeft, LockKeyhole, Mail, ShieldCheck } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { apiErrorMessage, useAuth } from "@/lib/auth";

export default function OwnerLogin() {
  const navigate = useNavigate();
  const { user, login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  if (user) {
    navigate("/owner/menu", { replace: true });
    return null;
  }

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSaving(true);
    setError("");
    try {
      await login(email, password);
      navigate("/owner/menu", { replace: true });
    } catch (nextError) {
      setError(apiErrorMessage(nextError));
    } finally {
      setSaving(false);
    }
  };

  return (
    <main className="admin-auth-page" data-testid="owner-login-page">
      <div className="admin-auth-card">
        <Link className="admin-back-link" to="/" data-testid="owner-login-back-link"><ArrowLeft size={16} /> Back to Cake World</Link>
        <div className="admin-auth-icon"><ShieldCheck size={25} /></div>
        <span className="eyebrow">Owner access</span>
        <h1>Keep today’s counter current.</h1>
        <p>Sign in to add, hide and price the items customers see on the bakery page.</p>
        <form className="admin-form" onSubmit={submit}>
          <label className="admin-field" htmlFor="owner-email"><span><Mail size={14} /> Owner email</span><input id="owner-email" type="email" autoComplete="username" value={email} onChange={(event) => setEmail(event.target.value)} required data-testid="owner-email-input" /></label>
          <label className="admin-field" htmlFor="owner-password"><span><LockKeyhole size={14} /> Password</span><input id="owner-password" type="password" autoComplete="current-password" value={password} onChange={(event) => setPassword(event.target.value)} required data-testid="owner-password-input" /></label>
          {error && <p className="admin-error" role="alert" data-testid="owner-login-error">{error}</p>}
          <button className="admin-primary-button" type="submit" disabled={saving} data-testid="owner-login-submit">{saving ? "Checking…" : "Open the live menu"}</button>
        </form>
      </div>
    </main>
  );
}
