import Image from 'next/image'

export default function Home() {
  return (
    <main className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center text-myColor">日本ミャンマー協力Connect団体へようこそ</h1>
        <span className="text-myColor">Your text here</span>
        
        <div className="bg-gray-100 rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-semibold mb-4">私たちについて</h2>
          <p className="text-gray-700 mb-4">
            Connect団体は、日本とミャンマーの架け橋となり、両国の文化交流と相互理解を深めることを目指しています。
            私たちは教育支援、文化交流、そして持続可能な発展のための活動を行っています。
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-gray-100 rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-semibold mb-3">ミッション</h3>
            <p className="text-gray-700">
              両国の若者たちが互いの文化を理解し、
              共に成長できる機会を創出することで、
              より良い未来を築いていきます。
            </p>
          </div>

          <div className="bg-gray-100 rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-semibold mb-3">ビジョン</h3>
            <p className="text-gray-700">
              文化の違いを超えて、
              相互理解と協力を通じて、
              持続可能な関係を構築します。
            </p>
          </div>
        </div>
      </div>
    </main>
  )
}