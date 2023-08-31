import Header from '@/components/shared/header'
import './globals.css'
import Footer from '@/components/shared/footer'

export const metadata = {
  title: "Uryzen317's personal blog",
  description: "Uryzen317's personal blog post,  here you'll find my posts and writings.",
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className='bg-gray-500'>
        <Header />
        <div className='flex justify-center min-h-screen'>{children}</div>
        <Footer />
      </body>
    </html>
  )
}
