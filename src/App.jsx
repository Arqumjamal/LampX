import { useEffect, useState } from "react";
const API = "http://localhost:5000/api";
export default function App() {
  const [mode, setMode] = useState("login");
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);
  async function request(path, options = {}) {
    const response = await fetch(`${API}${path}`, { credentials: "include", headers: { "Content-Type": "application/json" }, ...options });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || "Request failed");
    return data;
  }
  useEffect(() => { request("/auth/me").then(d => setUser(d.user)).catch(() => {}); }, []);
  function update(e) { setForm({ ...form, [e.target.name]: e.target.value }); }
  async function submit(e) {
    e.preventDefault(); setBusy(true); setMessage("");
    try {
      const data = await request(`/auth/${mode}`, { method: "POST", body: JSON.stringify(form) });
      setUser(data.user); setMessage(data.message);
    } catch (err) { setMessage(err.message); }
    finally { setBusy(false); }
  }
  async function logout() {
    try { const data = await request("/auth/logout", { method: "POST" }); setUser(null); setMessage(data.message); }
    catch (err) { setMessage(err.message); }
  }
  return <main className="shell"><nav><div className="brand"><span className="lamp">✦</span> LampX</div><span className="nav-note">Your workspace, simplified</span></nav>
    {user ? <section className="panel dashboard"><div className="eyebrow">YOUR DASHBOARD</div><h1>Welcome, {user.name}.</h1><p>You are signed in to your LampX workspace.</p><div className="profile"><span>Account email</span><strong>{user.email}</strong></div><button onClick={logout}>Sign out</button></section> :
    <section className="panel"><div className="eyebrow">WELCOME TO LAMPX</div><h1>{mode === "login" ? "Sign in to your space." : "Create your account."}</h1><p className="sub">A simple, secure place to get started.</p>
      <div className="tabs"><button className={mode === "login" ? "active" : ""} onClick={() => {setMode("login");setMessage("");}}>Sign in</button><button className={mode === "register" ? "active" : ""} onClick={() => {setMode("register");setMessage("");}}>Create account</button></div>
      <form onSubmit={submit}>{mode === "register" && <label>Full name<input name="name" value={form.name} onChange={update} minLength="2" required placeholder="Your name" /></label>}
        <label>Email address<input name="email" type="email" value={form.email} onChange={update} required placeholder="you@example.com" /></label>
        <label>Password<input name="password" type="password" value={form.password} onChange={update} minLength="8" required placeholder="At least 8 characters" /></label>
        <button className="submit" disabled={busy}>{busy ? "Please wait..." : mode === "login" ? "Sign in" : "Create account"}</button></form>
      {message && <div className="message" role="status">{message}</div>}<div className="secure">🔒 Protected with encrypted password storage and secure sessions</div>
    </section>}
    <footer>© 2026 LampX · Built for focused work</footer></main>;
}