"use client";

interface SimpleAuroraProps {
  className?: string;
}

export default function SimpleAurora({ className = "" }: SimpleAuroraProps) {
  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`}>
      {/* Base gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0f1419] via-[#1a202c] to-[#2d3748]" />
      
      {/* Animated aurora layers */}
      <div className="absolute inset-0">
        {/* First aurora wave */}
        <div 
          className="absolute inset-0 opacity-30"
          style={{
            background: `radial-gradient(ellipse 800px 400px at 50% 100%, 
              rgba(49, 130, 206, 0.3) 0%, 
              rgba(66, 153, 226, 0.2) 30%, 
              transparent 70%)`,
            animation: 'aurora-wave-1 8s ease-in-out infinite alternate'
          }}
        />
        
        {/* Second aurora wave */}
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            background: `radial-gradient(ellipse 600px 300px at 20% 80%, 
              rgba(66, 153, 226, 0.4) 0%, 
              rgba(49, 130, 206, 0.3) 40%, 
              transparent 70%)`,
            animation: 'aurora-wave-2 10s ease-in-out infinite alternate-reverse'
          }}
        />
        
        {/* Third aurora wave */}
        <div 
          className="absolute inset-0 opacity-25"
          style={{
            background: `radial-gradient(ellipse 700px 350px at 80% 90%, 
              rgba(49, 130, 206, 0.2) 0%, 
              rgba(66, 153, 226, 0.3) 50%, 
              transparent 80%)`,
            animation: 'aurora-wave-3 12s ease-in-out infinite alternate'
          }}
        />
      </div>
      
      {/* Subtle particle effect overlay */}
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, rgba(49, 130, 206, 0.3) 1px, transparent 0)`,
          backgroundSize: '64px 64px',
          animation: 'float 20s ease-in-out infinite'
        }}
      />
      
      <style jsx>{`
        @keyframes aurora-wave-1 {
          0% { transform: translateX(-10%) scale(1); }
          100% { transform: translateX(10%) scale(1.1); }
        }
        
        @keyframes aurora-wave-2 {
          0% { transform: translateX(10%) translateY(-5%) scale(0.9); }
          100% { transform: translateX(-15%) translateY(5%) scale(1.2); }
        }
        
        @keyframes aurora-wave-3 {
          0% { transform: translateX(-5%) translateY(5%) scale(1.1); }
          100% { transform: translateX(15%) translateY(-10%) scale(0.8); }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-10px) rotate(180deg); }
        }
      `}</style>
    </div>
  );
}
