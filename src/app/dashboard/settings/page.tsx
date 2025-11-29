// File: src/app/dashboard/settings/page.tsx
import { UserProfile } from '@/src/components/profile/UserProfile'

export default function SettingsPage() {
  return (
    <div className="max-w-2xl mx-auto py-6 px-4">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-600">Manage your account settings and preferences</p>
      </div>
      
      <UserProfile />
    </div>
  )
}