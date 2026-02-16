```markdown
src/
│
├── app/
│   ├── App.tsx              ← Layout principal + RouterProvider
│   └── router.tsx           ← Definición de rutas
│
├── modules/                 ← MÓDULOS DEL SISTEMA (lo importante)
│   ├── auth/
│   │   ├── pages/
│   │   │   └── LoginPage.tsx
│   │   ├── services/
│   │   │   └── auth.service.ts
│   │   └── types.ts
│   │
│   ├── files/
│   │   ├── pages/
│   │   │   ├── FilesPage.tsx
│   │   │   └── FileDetailPage.tsx
│   │   └── services/
│   │       └── files.service.ts
│   │
│   └── dashboard/
│       └── pages/
│           └── DashboardPage.tsx
│
├── components/
│   ├── ui/                  ← shadcn (Button, Input, etc)
│   ├── layout/              ← Sidebar, Header, Layout
│   └── common/              ← cosas reutilizables (Loader, EmptyState)
│
├── services/
│   └── api/
│       └── api.ts            ← apiFetch (interceptor)
│
├── hooks/
│   └── useAuth.ts            ← estado de usuario (opcional)
│
├── index.css
└── main.tsx

```