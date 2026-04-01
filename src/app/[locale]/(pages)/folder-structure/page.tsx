"use client"

import { useState } from "react";

const structure = [
  {
    name: "src/",
    icon: "📁",
    color: "#f59e0b",
    description: "সমস্ত source code এখানে থাকে। Next.js এ `src` directory optional কিন্তু best practice।",
    children: [
      {
        name: "app/",
        icon: "🗂️",
        color: "#6366f1",
        description: "Next.js 13+ App Router। প্রতিটি folder = একটি route। `layout.tsx`, `page.tsx`, `loading.tsx`, `error.tsx` এখানে থাকে।",
        children: [
          { name: "[locale]/", icon: "🌐", color: "#8b5cf6", description: "next-intl এর জন্য dynamic locale segment। যেমন: /en/dashboard বা /bn/dashboard।" },
          { name: "api/", icon: "⚡", color: "#ec4899", description: "Backend API routes। যেমন: app/api/auth/route.ts, app/api/mailer/route.ts।" },
          { name: "layout.tsx", icon: "📄", color: "#64748b", description: "Root layout। সব page এর wrapper। Font, Theme Provider, Auth Session এখানে inject হয়।" },
          { name: "page.tsx", icon: "📄", color: "#64748b", description: "Root page component (/)।" },
        ],
      },
      {
        name: "components/",
        icon: "🧩",
        color: "#10b981",
        description: "Reusable React components। Feature-based বা type-based ভাগ করা হয়।",
        children: [
          { name: "ui/", icon: "🎨", color: "#06b6d4", description: "Shadcn/ui থেকে generate হওয়া primitive components। যেমন: Button, Input, Dialog, Card। এগুলো নিজে edit করো না।" },
          { name: "common/", icon: "🔁", color: "#06b6d4", description: "সব জায়গায় ব্যবহৃত shared components। যেমন: Navbar, Footer, Sidebar, ThemeToggle, LanguageSwitcher।" },
          { name: "features/", icon: "🏗️", color: "#06b6d4", description: "Feature-specific components। যেমন: components/features/auth/LoginForm.tsx, components/features/dashboard/StatsCard.tsx।" },
          { name: "layouts/", icon: "📐", color: "#06b6d4", description: "Page layout wrappers। যেমন: DashboardLayout, AuthLayout। route-level layout এর চেয়ে বেশি reusable।" },
        ],
      },
      {
        name: "hooks/",
        icon: "🪝",
        color: "#f97316",
        description: "Custom React hooks। `use` prefix দিয়ে শুরু হয়। Logic কে component থেকে আলাদা রাখে।",
        children: [
          { name: "useAuth.ts", icon: "🔐", color: "#64748b", description: "Better Auth বা session related logic। useSession() wrap করে custom behavior add করে।" },
          { name: "useTheme.ts", icon: "🌙", color: "#64748b", description: "next-themes এর wrapper। dark/light toggle, system preference detect।" },
          { name: "useMediaQuery.ts", icon: "📱", color: "#64748b", description: "Responsive breakpoint detect করার hook।" },
          { name: "useDebounce.ts", icon: "⏱️", color: "#64748b", description: "Input debounce করার utility hook।" },
        ],
      },
      {
        name: "context/",
        icon: "🌍",
        color: "#a855f7",
        description: "React Context API। Global state যা prop drilling ছাড়া share করতে হবে। Zustand/Redux এর হালকা বিকল্প।",
        children: [
          { name: "AuthContext.tsx", icon: "🔑", color: "#64748b", description: "User authentication state globally share করে। useContext(AuthContext) দিয়ে যেকোনো জায়গা থেকে access।" },
          { name: "ThemeContext.tsx", icon: "🎨", color: "#64748b", description: "App-wide theme state। Color palette, font preference manage করে।" },
          { name: "ChatContext.tsx", icon: "💬", color: "#64748b", description: "AI Chatbot এর conversation history, loading state globally manage করে।" },
        ],
      },
      {
        name: "providers/",
        icon: "🏭",
        color: "#ef4444",
        description: "Context Provider components। `layout.tsx` এ wrap করা হয়। Third-party library গুলোকে 'use client' এ isolate করে।",
        children: [
          { name: "ThemeProvider.tsx", icon: "🌗", color: "#64748b", description: "next-themes এর ThemeProvider wrap করে। 'use client' এখানে, layout.tsx এ শুধু import।" },
          { name: "SessionProvider.tsx", icon: "👤", color: "#64748b", description: "Better Auth বা NextAuth session provider wrap করে।" },
          { name: "QueryProvider.tsx", icon: "🔄", color: "#64748b", description: "TanStack Query (React Query) এর QueryClientProvider wrap করে।" },
          { name: "AppProviders.tsx", icon: "📦", color: "#64748b", description: "সব providers কে একসাথে compose করে। layout.tsx এ শুধু <AppProviders> একটাই import করতে হয়।" },
        ],
      },
      {
        name: "lib/",
        icon: "📚",
        color: "#14b8a6",
        description: "Utility functions, configurations, third-party library setup। Business logic না, pure helper code।",
        children: [
          { name: "auth.ts", icon: "🔒", color: "#64748b", description: "Better Auth configuration। providers, callbacks, session setup এখানে।" },
          { name: "db.ts", icon: "🗄️", color: "#64748b", description: "MongoDB / Mongoose connection setup। singleton pattern ব্যবহার করে।" },
          { name: "mailer.ts", icon: "📧", color: "#64748b", description: "Nodemailer configuration। transporter setup, email template helper।" },
          { name: "utils.ts", icon: "🛠️", color: "#64748b", description: "General utility functions। cn() (classnames merger), formatDate(), truncate() ইত্যাদি।" },
          { name: "validations.ts", icon: "✅", color: "#64748b", description: "Zod schemas। Form validation, API input validation।" },
        ],
      },
      {
        name: "proxy/",
        icon: "🔀",
        color: "#0ea5e9",
        description: "Better Auth এ middleware.ts এর বদলে proxy.ts ব্যবহার হয়। Auth routes protect করে, redirect logic এখানে থাকে।",
        children: [
          { name: "proxy.ts", icon: "🛡️", color: "#64748b", description: "Route protection logic। Authenticated user কোথায় যাবে, unauthenticated কোথায় redirect হবে সেটা define করে। middleware.ts এর alternative।" },
        ],
      },
      {
        name: "services/",
        icon: "⚙️",
        color: "#f43f5e",
        description: "API call functions। fetch/axios দিয়ে backend communicate করার সব logic এখানে isolate থাকে।",
        children: [
          { name: "authService.ts", icon: "🔐", color: "#64748b", description: "Login, logout, register, session fetch API calls।" },
          { name: "userService.ts", icon: "👥", color: "#64748b", description: "User CRUD operations। getUser(), updateProfile() ইত্যাদি।" },
          { name: "chatService.ts", icon: "🤖", color: "#64748b", description: "Anthropic API call করার functions। streamChat(), sendMessage() ইত্যাদি।" },
        ],
      },
      {
        name: "types/",
        icon: "📝",
        color: "#84cc16",
        description: "TypeScript type definitions। Global interfaces, enums, type aliases। সব জায়গায় reuse হয়।",
        children: [
          { name: "auth.types.ts", icon: "📋", color: "#64748b", description: "User, Session, Role interface define করে।" },
          { name: "api.types.ts", icon: "📋", color: "#64748b", description: "API response types। ApiResponse<T>, ErrorResponse।" },
          { name: "index.ts", icon: "📋", color: "#64748b", description: "সব types re-export করে। import { User } from '@/types' এভাবে clean import।" },
        ],
      },
      {
        name: "config/",
        icon: "⚙️",
        color: "#fb923c",
        description: "App-wide configuration constants। Magic strings এবং numbers এখানে centralize হয়।",
        children: [
          { name: "site.ts", icon: "🌐", color: "#64748b", description: "Site metadata। name, description, url, social links।" },
          { name: "navigation.ts", icon: "🧭", color: "#64748b", description: "Nav links array। role-based menu items define করা।" },
          { name: "i18n.ts", icon: "🌍", color: "#64748b", description: "next-intl configuration। supported locales, default locale।" },
        ],
      },
      {
        name: "styles/",
        icon: "🎨",
        color: "#c084fc",
        description: "Global CSS files। Tailwind base styles, CSS variables, custom animations।",
        children: [
          { name: "globals.css", icon: "🎨", color: "#64748b", description: "Tailwind directives, CSS custom properties (color tokens, font variables)।" },
        ],
      },
    ],
  },
  {
    name: "public/",
    icon: "📂",
    color: "#94a3b8",
    description: "Static assets। Images, fonts, icons, robots.txt, sitemap.xml। URL দিয়ে directly access করা যায়।",
  },
  {
    name: "messages/",
    icon: "💬",
    color: "#34d399",
    description: "next-intl translation files। প্রতিটি locale এর জন্য আলাদা JSON file।",
    children: [
      { name: "en.json", icon: "🇺🇸", color: "#64748b", description: "English translations।" },
      { name: "bn.json", icon: "🇧🇩", color: "#64748b", description: "বাংলা translations।" },
    ],
  },
];

function FolderItem({ item, depth = 0 } : { item: typeof structure[0]; depth?: number }) {
  const [open, setOpen] = useState(depth === 0);
  const hasChildren = item.children && item.children.length > 0;

  return (
    <div className="folder-item" style={{ marginLeft: depth * 20 }}>
      <div
        className={`item-row ${hasChildren ? "clickable" : ""}`}
        onClick={() => hasChildren && setOpen(!open)}
        style={{ borderLeft: depth > 0 ? `2px solid ${item.color}22` : "none" }}
      >
        <div className="item-header">
          <span className="item-icon">{item.icon}</span>
          <span className="item-name" style={{ color: item.color }}>
            {item.name}
          </span>
          {hasChildren && (
            <span className="toggle-arrow" style={{ transform: open ? "rotate(90deg)" : "rotate(0deg)" }}>
              ›
            </span>
          )}
        </div>
        <p className="item-desc">{item.description}</p>
      </div>

      {hasChildren && open && (
        <div className="children">
          {item.children.map((child, i) => (
            <FolderItem key={i} item={child} depth={depth + 1} />
          ))}
        </div>
      )}
    </div>
  );
}

export default function App() {
  const [activeTab, setActiveTab] = useState("structure");

  const rawStructure = `my-nextjs-app/
├── src/
│   ├── app/
│   │   ├── [locale]/
│   │   │   ├── (auth)/
│   │   │   │   ├── login/page.tsx
│   │   │   │   └── register/page.tsx
│   │   │   ├── (dashboard)/
│   │   │   │   └── dashboard/page.tsx
│   │   │   ├── layout.tsx        ← main locale layout
│   │   │   └── page.tsx
│   │   ├── api/
│   │   │   ├── auth/[...all]/route.ts
│   │   │   └── mailer/route.ts
│   │   └── layout.tsx            ← root layout
│   │
│   ├── components/
│   │   ├── ui/                   ← shadcn components
│   │   ├── common/               ← Navbar, Footer, etc.
│   │   ├── features/             ← feature-specific
│   │   └── layouts/              ← page wrappers
│   │
│   ├── hooks/
│   │   ├── useAuth.ts
│   │   ├── useTheme.ts
│   │   └── useDebounce.ts
│   │
│   ├── context/
│   │   ├── AuthContext.tsx
│   │   └── ChatContext.tsx
│   │
│   ├── providers/
│   │   ├── ThemeProvider.tsx
│   │   ├── SessionProvider.tsx
│   │   ├── QueryProvider.tsx
│   │   └── AppProviders.tsx      ← সব একসাথে
│   │
│   ├── lib/
│   │   ├── auth.ts
│   │   ├── db.ts
│   │   ├── mailer.ts
│   │   └── utils.ts
│   │
│   ├── proxy/
│   │   └── proxy.ts              ← route protection
│   │
│   ├── services/
│   │   ├── authService.ts
│   │   └── chatService.ts
│   │
│   ├── types/
│   │   ├── auth.types.ts
│   │   └── index.ts
│   │
│   ├── config/
│   │   ├── site.ts
│   │   ├── navigation.ts
│   │   └── i18n.ts
│   │
│   └── styles/
│       └── globals.css
│
├── public/
├── messages/
│   ├── en.json
│   └── bn.json
│
├── next.config.ts
├── tailwind.config.ts
└── tsconfig.json`;

  return (
    <>
      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        
        body {
          font-family: 'Segoe UI', system-ui, sans-serif;
          background: #0a0f1e;
          color: #e2e8f0;
          min-height: 100vh;
        }

        .app {
          max-width: 900px;
          margin: 0 auto;
          padding: 32px 16px;
        }

        .header {
          text-align: center;
          margin-bottom: 40px;
        }

        .badge {
          display: inline-block;
          background: linear-gradient(135deg, #6366f1, #8b5cf6);
          color: white;
          padding: 4px 14px;
          border-radius: 99px;
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 1px;
          text-transform: uppercase;
          margin-bottom: 14px;
        }

        .header h1 {
          font-size: clamp(24px, 5vw, 40px);
          font-weight: 800;
          background: linear-gradient(135deg, #6366f1, #a78bfa, #06b6d4);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin-bottom: 10px;
          line-height: 1.2;
        }

        .header p {
          color: #94a3b8;
          font-size: 15px;
        }

        .tabs {
          display: flex;
          gap: 8px;
          margin-bottom: 24px;
          background: #111827;
          padding: 6px;
          border-radius: 12px;
          border: 1px solid #1e293b;
        }

        .tab {
          flex: 1;
          padding: 10px 16px;
          border-radius: 8px;
          border: none;
          background: transparent;
          color: #64748b;
          cursor: pointer;
          font-size: 14px;
          font-weight: 500;
          transition: all 0.2s;
        }

        .tab.active {
          background: linear-gradient(135deg, #6366f1, #8b5cf6);
          color: white;
        }

        .panel {
          background: #111827;
          border: 1px solid #1e293b;
          border-radius: 16px;
          padding: 24px;
        }

        .folder-item { margin-bottom: 4px; }

        .item-row {
          padding: 10px 14px;
          border-radius: 10px;
          margin-bottom: 4px;
          background: #0f172a;
          border: 1px solid #1e293b;
          transition: all 0.2s;
          padding-left: 12px;
        }

        .item-row.clickable {
          cursor: pointer;
        }

        .item-row.clickable:hover {
          background: #1e293b;
          border-color: #334155;
        }

        .item-header {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 5px;
        }

        .item-icon { font-size: 16px; }

        .item-name {
          font-family: 'Courier New', monospace;
          font-size: 14px;
          font-weight: 700;
        }

        .toggle-arrow {
          margin-left: auto;
          color: #475569;
          font-size: 18px;
          transition: transform 0.2s;
          display: inline-block;
        }

        .item-desc {
          color: #94a3b8;
          font-size: 13px;
          line-height: 1.6;
          margin-left: 24px;
        }

        .children { margin-top: 4px; }

        pre {
          background: #0f172a;
          border: 1px solid #1e293b;
          border-radius: 12px;
          padding: 20px;
          overflow-x: auto;
          font-family: 'Courier New', monospace;
          font-size: 13px;
          line-height: 1.8;
          color: #94a3b8;
        }

        .tips-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
          gap: 16px;
        }

        .tip-card {
          background: #0f172a;
          border: 1px solid #1e293b;
          border-radius: 12px;
          padding: 18px;
        }

        .tip-card h3 {
          font-size: 14px;
          font-weight: 700;
          margin-bottom: 10px;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .tip-card p {
          font-size: 13px;
          color: #94a3b8;
          line-height: 1.7;
        }

        code {
          background: #1e293b;
          padding: 2px 6px;
          border-radius: 4px;
          font-size: 12px;
          color: #a78bfa;
          font-family: monospace;
        }

        .footer-note {
          text-align: center;
          color: #475569;
          font-size: 12px;
          margin-top: 24px;
        }
      `}</style>

      <div className="app">
        <div className="header">
          <div className="badge">Next.js 15 · TypeScript · App Router</div>
          <h1>Production Folder Structure</h1>
          <p>ক্লিক করে প্রতিটি folder এর বিস্তারিত জানুন</p>
        </div>

        <div className="tabs">
          <button className={`tab ${activeTab === "structure" ? "active" : ""}`} onClick={() => setActiveTab("structure")}>
            📁 Interactive Explorer
          </button>
          <button className={`tab ${activeTab === "raw" ? "active" : ""}`} onClick={() => setActiveTab("raw")}>
            🗒️ Raw Tree
          </button>
          <button className={`tab ${activeTab === "tips" ? "active" : ""}`} onClick={() => setActiveTab("tips")}>
            💡 Best Practices
          </button>
        </div>

        <div className="panel">
          {activeTab === "structure" && (
            <div>
              {structure.map((item, i) => (
                <FolderItem key={i} item={item} depth={0} />
              ))}
            </div>
          )}

          {activeTab === "raw" && <pre>{rawStructure}</pre>}

          {activeTab === "tips" && (
            <div className="tips-grid">
              {[
                { icon: "🏭", title: "Providers আলাদা রাখো", color: "#6366f1", text: "সব third-party providers কে providers/ folder এ রাখো। layout.tsx এ শুধু <AppProviders> wrap করবে। এতে 'use client' contamination হয় না।" },
                { icon: "🔀", title: "proxy.ts vs middleware.ts", color: "#f59e0b", text: "Better Auth ব্যবহার করলে proxy.ts ব্যবহার করো middleware.ts এর বদলে। এটি auth route conflicts এড়ায় এবং cleaner থাকে।" },
                { icon: "🧩", title: "ui/ folder touch করো না", color: "#10b981", text: "Shadcn components ui/ folder এ থাকে। এগুলো directly edit না করে, custom wrapper component বানাও components/common/ বা components/features/ এ।" },
                { icon: "📦", title: "Barrel exports ব্যবহার করো", color: "#a855f7", text: "প্রতিটি folder এ index.ts রাখো। তাহলে import { useAuth } from '@/hooks' এভাবে clean import করা যাবে।" },
                { icon: "⚙️", title: "Services layer তৈরি করো", color: "#ec4899", text: "API calls কখনো directly component এ করো না। services/ folder এ function বানাও, hooks দিয়ে call করো। এতে testing ও refactoring সহজ হয়।" },
                { icon: "🌍", title: "Types centralize করো", color: "#0ea5e9", text: "TypeScript interfaces ও types সব types/ folder এ রাখো। Component এর মধ্যে inline type define না করে shared types import করো।" },
              ].map((tip, i) => (
                <div className="tip-card" key={i} style={{ borderColor: tip.color + "33" }}>
                  <h3 style={{ color: tip.color }}><span>{tip.icon}</span>{tip.title}</h3>
                  <p>{tip.text}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        <p className="footer-note">📁 folder এ ক্লিক করলে expand/collapse হবে · Next.js 15 + TypeScript + App Router</p>
      </div>
    </>
  );
}