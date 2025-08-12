import { useEffect, useState } from "react";
import ApiServices from "../APIService";
import "../Login_Page/Login_Page.css"

function LoginForm() {
  const [users, setUsers] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");

  useEffect(() => {
    ApiServices.user()
      .then((res) => setUsers(res.data || []))
      .catch((err) => {
        console.error("API error:", err);
        setMsg("שגיאה בטעינת משתמשים");
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    // בדיקה מול הנתונים שחזרו מה-API (שם משתמש + סיסמה)
    const found = users.find(
      (u) =>
        (u?.name || "").trim().toLowerCase() === username.trim().toLowerCase() &&
        (u?.password || "") === password
    );

    if (found) {
      setMsg("התחברת בהצלחה ✅");
      // לדוגמה:
      // localStorage.setItem("user", JSON.stringify(found));
      // navigate("/home");
    } else {
      setMsg("שם משתמש או סיסמה לא נכונים ❌");
    }
  };

  return (
    <div className="login-card">
      <div className="login-header">התחברות למערכת</div>

      <form className="login-form" onSubmit={handleSubmit}>
        <label>
          שם משתמש:
          <input
            type="text"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            autoComplete="username"
          />
        </label>

        <label>
          סיסמה:
          <input
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
          />
        </label>

        <button type="submit" className="login-button">
          התחבר
        </button>

        {/* בלי מחלקות חדשות, רק הודעה טקסטואלית קטנה */}
        {msg ? (
          <div style={{ marginTop: 10, color: msg.includes("✅") ? "green" : "crimson" }}>
            {msg}
          </div>
        ) : null}
      </form>
    </div>
  );
}

export default function LoginPage() {
  return (
    <div className="login-page" dir="rtl">
      <LoginForm />
    </div>
  );
}
