'use client';

import React from "react";
import "./globals.css";

export default function Layout({ children }) {
  return (
    <html>
        <body>
            <div className="min-h-screen bg-[#1C1C28]">
      {children}
    </div>
        </body>
    </html>

  );
}
