import React from "react";
import "./HomePage.css";
import { useEffect } from 'react';
import ApiServices from '../APIService/index'
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="logo">ConnectCare</div>
      <ul className="nav-list">
        
        <li className="nav-item">
          <Link to="/" className="nav-link">
            דף הבית
          </Link>
        </li>
        <li className="nav-item">בקשות</li>
        <li className="nav-item">הכר את הנתנדבים</li>
        <li className="nav-item">אודות</li>
        <li className="nav-item">צור קשרגדשגדש</li>
        <li className="nav-item">
          <Link to="/login" className="nav-link">
            כניסה
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/register" className="nav-link">
            הרשמה
          </Link>
        </li>
      </ul>
    </nav>
  );
}


function HomePage() {
  



  return (
    <div className="app" dir="rtl">
      <Navbar />
      <img src="mainpicture.jpeg" alt="mainPicture" className="full-width" />
      <div className="content">
        <h1>ברוכים הבאים ל-ConnectCare</h1>
        <p>
          המערכת נבנתה כדי לחבר בין מתנדבים מסורים לבין קשישים ופצועי צה"ל הזקוקים לתמיכה יומיומית.
          כאן תוכלו לפתוח בקשות לעזרה או להתנדב למענה על הצרכים השונים – החל במתן אוכל, שיחה חמה,
          ליווי לפיזיותרפיה, טיול בעיר ועוד. המטרה שלנו היא לוודא שאף אחד לא יישאר לבד ושכל מבוגר
          יקבל את התמיכה שמגיעה לו בצורה בטוחה, מהירה ונוחה.
        </p>
        <h1>לשמח מישהו זה בעצם לשמח את עצמך</h1>
        <p>
מחקרים רבים מראים כי אנשים שמתנדבים הם בדרך כלל אנשים שמחים יותר.
 ההתנדבות לא רק מעניקה תחושת סיפוק ומשמעות, אלא גם תורמת לרווחה הנפשית והאושר הכללי בחיי היומיום. למעשה, המעורבות בקהילה והעזרה
  לאחרים יוצרת תחושת שייכות, מחזקת קשרים חברתיים ומעשירה את חיי המתנדב, מה שתורם באופן משמעותי לשיפור איכות החיים והאושר האישי.        </p>
        <div className="button-container">
          <button className="button">פתח בקשה</button>
          <button className="button">התנדב עכשיו</button>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
