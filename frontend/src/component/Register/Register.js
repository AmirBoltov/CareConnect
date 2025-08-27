import React, { useState, useEffect, useMemo } from "react";
import APIService from "../APIService";
import { useNavigate } from "react-router-dom"; 


const genId = () =>
  (Math.random().toString(16).slice(2) + Date.now().toString(16)).slice(0, 24);

const phoneIL = /^0\d{8,10}$/;

export default function Register() {
  const [users, setUsers] = useState([]);
  const [role, setRole] = useState("volunteer");
  const [form, setForm] = useState({
   
    about: "",
    confirm: false,
    name: "",
    number: "",
    password: "",
    type: "volunteer",
    location: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    setForm((f) => ({ ...f, type: role }));
  }, [role]);

  const errors = useMemo(() => {
    const e = {};
    if (!form.name.trim()) e.name = "שדה חובה";
    if (!phoneIL.test(form.number || "")) e.number = "מס׳ טלפון לא תקין";
    if ((form.password || "").length < 4) e.password = "לפחות 4 תווים";
    if (!form.location.trim()) e.location = "ציינו מיקום";
    if (!form.about.trim()) e.about = "ספרו במשפט על עצמכם";
    if (!form.confirm) e.confirm = "חובה לאשר התחייבות זו לפני ההרשמה";
    return e;
  }, [form]);

  const onChange = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const resetForm = () =>
    setForm({
      
      about: "",
      confirm: false,
      name: "",
      number: "",
      password: "",
      type: role,
      location: "",
    });

  const onSubmit = (e) => {
    e.preventDefault();
    if (Object.keys(errors).length) return;
    APIService.createUser(form)
      navigate("/");
    resetForm();
  };

  const removeUser = (_id) =>
    setUsers((arr) => arr.filter((u) => u._id !== _id));

  return (
    <div className="container py-5" dir="rtl">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card shadow">
            <div className="card-body">
              <h1 className="card-title text-center mb-4">הרשמה</h1>

              {/* סוג משתמש */}
              <div className="mb-3 text-center">
                <div className="btn-group">
                  <button
                    type="button"
                    className={`btn ${role === "volunteer" ? "btn-primary" : "btn-outline-primary"}`}
                    onClick={() => setRole("volunteer")}
                  >
                    מתנדב
                  </button>
                  <button
                    type="button"
                    className={`btn ${role === "recipient" ? "btn-primary" : "btn-outline-primary"}`}
                    onClick={() => setRole("recipient")}
                  >
                    נזקק לעזרה
                  </button>
                </div>
              </div>

              {/* טופס */}
              <form onSubmit={onSubmit}>
                <div className="row mb-3">
                  <div className="col-md-6">
                    <label className="form-label">שם מלא</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder={role === "volunteer" ? "" : ""}
                      value={form.name}
                      onChange={(e) => onChange("name", e.target.value)}
                    />
                    {errors.name && <div className="text-danger small">{errors.name}</div>}
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">טלפון</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder=""
                      value={form.number}
                      onChange={(e) => onChange("number", e.target.value)}
                    />
                    {errors.number && <div className="text-danger small">{errors.number}</div>}
                  </div>
                </div>

                <div className="row mb-3">
                  <div className="col-md-6">
                    <label className="form-label">סיסמה</label>
                    <input
                      type="password"
                      className="form-control"
                      placeholder="••••"
                      value={form.password}
                      onChange={(e) => onChange("password", e.target.value)}
                    />
                    {errors.password && <div className="text-danger small">{errors.password}</div>}
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">מיקום</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder={role === "volunteer" ? "Beer Sheva" : "Ashdod"}
                      value={form.location}
                      onChange={(e) => onChange("location", e.target.value)}
                    />
                    {errors.location && <div className="text-danger small">{errors.location}</div>}
                  </div>
                </div>

                <div className="mb-3">
                  <label className="form-label">על עצמי</label>
                  <textarea
                    className="form-control"
                    rows="3"
                    placeholder={role === "volunteer" ? "I like to help and volunteer" : "I need help with..."}
                    value={form.about}
                    onChange={(e) => onChange("about", e.target.value)}
                  />
                  {errors.about && <div className="text-danger small">{errors.about}</div>}
                </div>
                {/* התחייבות */}
                <div className="mb-3">
                  <div className="form-check form-switch">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="confirmCheck"
                  checked={form.confirm}
                  onChange={(e) => onChange("confirm", e.target.checked)}
                />
            <label className="form-check-label" htmlFor="confirmCheck">
              אני מתחייב לא לפגוע באף אחד ולא להשתמש בפרטים לרעה
              </label>
              </div>
            {!form.confirm && (
                <div className="text-danger small">
                  חובה לאשר התחייבות זו לפני ההרשמה
              </div>
                )}
             </div>

                <div className="d-flex justify-content-center gap-2">
                  <button type="submit" className="btn btn-primary" disabled={Object.keys(errors).length > 0} // הכפתור מושבת אם יש שגיאות
>                   שמירה 
                  </button>
                  <button type="button" className="btn btn-secondary" onClick={resetForm}>
                    ניקוי טופס
                  </button>
                </div>
                {/* <p className="text-muted small text-center mt-2">_id נוצר אוטומטית ({form._id})</p> */}
              </form>
            </div>
          </div>

          {/* טבלה */}


        </div>
      </div>
    </div>
  );
}
