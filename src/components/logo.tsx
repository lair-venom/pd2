import { Skull } from 'lucide-react';

export default function Logo() {
  return (
    <div className="flex items-center gap-3 mb-12">
      <div className="relative">
        <div className="absolute inset-0 bg-orange-500 blur-xl opacity-50 animate-pulse"></div>
        <div className="relative bg-gradient-to-br from-orange-400 to-orange-600 p-3 rounded-xl transform rotate-12 shadow-2xl">
          <Skull className="w-8 h-8 text-[#1e1e24] transform -rotate-12" strokeWidth={2.5} />
        </div>
      </div>
      <div className="relative">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-orange-400 via-orange-300 to-orange-500 bg-clip-text text-transparent tracking-tight">
          Lair Venom
        </h1>
        <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-orange-500 to-transparent opacity-50"></div>
      </div>
    </div>
  );
}
