import { useEffect, useState } from "react";
import APIService from "../APIService";
import "./Login_Page.css"

function LoginForm() {
  const [users, setUsers] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");

  useEffect(() => {
    APIService.user()
      .then((res) => {
        setUsers(res.data || []);
        // console.log("API response:", res.data);
      })
      .catch((err) => {
        console.error("API error:", err);
        setMsg("שגיאה בטעינת משתמשים");
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    // חיפוש לפי שדות name + password במסמכים מה-API
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

      {/* שומר על הקלאסים שלך; ההגשה על ה-form */}
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

        {/* הכפתור נשאר עם אותו className ו-type=submit */}
        <button type="submit" className="login-button">
          התחבר
        </button>

        {/* הודעה בלי קלאס חדש כדי לא לגעת בעיצוב שלך */}
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