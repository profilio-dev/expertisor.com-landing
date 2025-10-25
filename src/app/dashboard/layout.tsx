export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex">
      <aside className="w-64 bg-indigo-600 text-white p-6">
        <h2 className="text-2xl font-semibold mb-8">Dashboard</h2>
        <nav className="space-y-3">
          <a href="#" className="block hover:underline">Overview</a>
          <a href="#" className="block hover:underline">Profile</a>
          <a href="#" className="block hover:underline">Settings</a>
        </nav>
      </aside>
      <main className="flex-1 p-10 bg-gray-50">{children}</main>
    </div>
  );
}
