import { Skull } from 'lucide-react';

export default function Logo() {
  return (
    <div className="flex flex-col items-center gap-4 mb-12">
      <div className="relative">
        <div className="absolute -inset-8 bg-gradient-to-r from-orange-500 via-red-500 to-blue-600 blur-3xl opacity-30 animate-pulse"></div>
        <div className="absolute -inset-4 bg-gradient-to-b from-orange-400/20 to-blue-400/20 blur-2xl"></div>

        <div className="relative">
          <h1 className="text-7xl font-black tracking-tighter" style={{
            fontFamily: '"Arial Black", sans-serif',
            background: 'linear-gradient(135deg, #EA580C 0%, #FF6B35 25%, #FFA500 50%, #FF6B35 75%, #EA580C 100%)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            textShadow: '0 0 30px rgba(234, 88, 12, 0.5), 0 0 60px rgba(255, 107, 53, 0.3)',
            filter: 'drop-shadow(0 0 20px rgba(234, 88, 12, 0.4))',
            letterSpacing: '-0.02em'
          }}>
            PAYDAY
          </h1>
        </div>

        <div className="relative flex items-center justify-center gap-2 mt-2">
          <div className="h-1 w-12 bg-gradient-to-r from-orange-500 to-orange-600/50"></div>
          <Skull className="w-6 h-6 text-orange-500 animate-pulse" strokeWidth={2.5} />
          <div className="h-1 w-12 bg-gradient-to-l from-orange-500 to-orange-600/50"></div>
        </div>

        <div className="relative mt-1 flex justify-center">
          <span className="text-6xl font-black" style={{
            background: 'linear-gradient(180deg, #3B82F6 0%, #60A5FA 50%, #1E40AF 100%)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            fontFamily: '"Arial Black", sans-serif',
            filter: 'drop-shadow(0 0 15px rgba(59, 130, 246, 0.5))',
            textShadow: '0 0 20px rgba(59, 130, 246, 0.3)',
            letterSpacing: '-0.02em'
          }}>
            2
          </span>
        </div>
      </div>

      <div className="flex gap-1.5 mt-2">
        <div className="w-1 h-1 rounded-full bg-orange-500 animate-pulse"></div>
        <div className="w-1 h-1 rounded-full bg-blue-500 animate-pulse" style={{ animationDelay: '0.2s' }}></div>
        <div className="w-1 h-1 rounded-full bg-orange-500 animate-pulse" style={{ animationDelay: '0.4s' }}></div>
      </div>
    </div>
  );
}
