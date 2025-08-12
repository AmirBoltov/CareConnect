import React from "react";
import "./HomePage.css";
import { useEffect } from 'react';
import ApiServices from '../APIService/index'

function Navbar() {
  return (
    <nav className="navbar">
      <div className="logo">המערכת שלי</div>
      <ul className="nav-list">
        <li className="nav-item">בית</li>
        <li className="nav-item">בקשות</li>
        <li className="nav-item">מתנדבים</li>
        <li className="nav-item">אודות</li>
        <li className="nav-item">צור קשר</li>
      </ul>
    </nav>
  );
}


function HomePage() {
  



  return (
    <div className="app" dir="rtl">
      <Navbar />
      <div className="content">
        <h1>ברוכים הבאים למערכת הסיוע</h1>
        <p>כאן תוכלו לפתוח בקשות, להתנדב ולעזור למבוגרים ופצועים בצה"ל.</p>
      </div>
    </div>
  );
}

export default HomePage;