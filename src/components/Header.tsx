import Link from 'next/link'
import Image from 'next/image'

export default function Header() {
  return (
    <header className="bg-[#dfcaa0] py-4">
      <div className="container mx-auto px-4">
        <nav className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <Image 
              src="/logo.png"
              alt="Connect Logo"
              width={200}
              height={200}
            //   className="rounded-full"
            />
            <div className="flex flex-col text-black hover:text-white">
              <span className="text-2xl font-bold">一般社団法人</span>
              <span className="text-sm">日本ミャンマー協力Connect団体</span>
            </div>
          </Link>
          
          <div className="flex space-x-6">
            <Link href="/about" className="text-black hover:text-white">
              活動紹介
            </Link>
            <Link href="/team" className="text-black hover:text-white">
              団体紹介
            </Link>
            <Link href="/how-to" className="text-black hover:text-white">
              活動方針
            </Link>
            <Link href="/activities" className="text-black hover:text-white">
              活動一覧
            </Link>
            <Link href="/contact" className="text-black hover:text-white">
              お問合せ
            </Link>
          </div>
        </nav>
      </div>
    </header>
  )
}