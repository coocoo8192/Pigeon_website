import { lazy, Suspense } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { Layout } from './components/Layout'
import { AboutPage } from './pages/AboutPage'
import { FeaturesPage } from './pages/FeaturesPage'
import { HomePage } from './pages/HomePage'
import { PrivacyPage } from './pages/PrivacyPage'
import { TermsPage } from './pages/TermsPage'

const DeleteAccountPage = lazy(async () => {
  const module = await import('./pages/DeleteAccountPage')
  return { default: module.DeleteAccountPage }
})

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="features" element={<FeaturesPage />} />
          <Route path="privacy" element={<PrivacyPage />} />
          <Route path="general-5" element={<PrivacyPage />} />
          <Route path="terms" element={<TermsPage />} />
          <Route path="general-5-1" element={<TermsPage />} />
          <Route path="about" element={<AboutPage />} />
          <Route
            path="delete-account"
            element={
              <Suspense
                fallback={
                  <section className="relative z-10 mx-auto w-full max-w-4xl px-5 pb-12 pt-8 text-white sm:px-8 sm:pb-16 sm:pt-10 lg:max-w-5xl">
                    <p className="text-white/70">Loading delete account…</p>
                  </section>
                }
              >
                <DeleteAccountPage />
              </Suspense>
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
