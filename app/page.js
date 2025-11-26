'use client';

import Link from "next/link";
import { Car, MapPin, Clock, Shield, Zap, CheckCircle } from "lucide-react";
import { useTranslation } from "./utils/useTranslation";
import { useState, useEffect } from "react";

export default function Home() {
  const { t } = useTranslation();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const features = [
    { icon: MapPin, title: 'Real-time Availability', desc: 'Find available spots instantly', color: '#3b82f6' },
    { icon: Clock, title: 'Save Time', desc: 'No more circling around', color: '#8b5cf6' },
    { icon: Shield, title: 'Secure Payment', desc: 'Multiple payment options', color: '#10b981' },
    { icon: Zap, title: 'Quick Access', desc: 'QR code entry & exit', color: '#f59e0b' }
  ];

  return (
    <div className="mobile-container" style={{
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      overflow: 'auto',
      position: 'relative'
    }}>
      {/* Animated Background Circles */}
      <div style={{
        position: 'absolute',
        top: '-50px',
        right: '-50px',
        width: '200px',
        height: '200px',
        borderRadius: '50%',
        background: 'rgba(255,255,255,0.1)',
        animation: 'float 6s ease-in-out infinite'
      }}></div>
      <div style={{
        position: 'absolute',
        bottom: '-30px',
        left: '-30px',
        width: '150px',
        height: '150px',
        borderRadius: '50%',
        background: 'rgba(255,255,255,0.1)',
        animation: 'float 8s ease-in-out infinite reverse'
      }}></div>

      <div style={{
        padding: '2rem 1.5rem',
        position: 'relative',
        zIndex: 1,
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
        transition: 'all 0.8s ease-out'
      }}>

        {/* Logo & Title Section */}
        <div style={{ textAlign: 'center', color: 'white', marginBottom: '2rem' }}>
          <div style={{
            background: 'linear-gradient(135deg, #ffffff 0%, #f0f0f0 100%)',
            width: '100px',
            height: '100px',
            borderRadius: '25px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 1.5rem auto',
            boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
            animation: 'bounce 2s ease-in-out infinite'
          }}>
            <Car size={50} color="#667eea" strokeWidth={2.5} />
          </div>

          <h1 style={{
            fontSize: '2.5rem',
            marginBottom: '0.5rem',
            fontWeight: '800',
            background: 'linear-gradient(to right, #fff, #e0e7ff)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}>
            {t('welcomeTitle')}
          </h1>
          <p style={{
            color: 'rgba(255,255,255,0.9)',
            fontSize: '1.1rem',
            fontWeight: '300',
            marginBottom: '2rem'
          }}>
            {t('welcomeSubtitle')}
          </p>

          {/* Stats */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '1rem',
            marginBottom: '2rem'
          }}>
            <div style={{
              background: 'rgba(255,255,255,0.15)',
              padding: '1rem 0.5rem',
              borderRadius: '15px',
              backdropFilter: 'blur(10px)'
            }}>
              <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>500+</div>
              <div style={{ fontSize: '0.75rem', opacity: 0.9 }}>Locations</div>
            </div>
            <div style={{
              background: 'rgba(255,255,255,0.15)',
              padding: '1rem 0.5rem',
              borderRadius: '15px',
              backdropFilter: 'blur(10px)'
            }}>
              <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>10k+</div>
              <div style={{ fontSize: '0.75rem', opacity: 0.9 }}>Users</div>
            </div>
            <div style={{
              background: 'rgba(255,255,255,0.15)',
              padding: '1rem 0.5rem',
              borderRadius: '15px',
              backdropFilter: 'blur(10px)'
            }}>
              <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>24/7</div>
              <div style={{ fontSize: '0.75rem', opacity: 0.9 }}>Support</div>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: '1rem',
          marginBottom: '2rem'
        }}>
          {features.map((feature, index) => (
            <div
              key={index}
              style={{
                background: 'rgba(255,255,255,0.95)',
                padding: '1.25rem',
                borderRadius: '20px',
                boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                transition: `all 0.6s ease-out ${index * 0.1}s`,
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-5px)';
                e.currentTarget.style.boxShadow = '0 15px 40px rgba(0,0,0,0.3)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.2)';
              }}
            >
              <div style={{
                width: '45px',
                height: '45px',
                borderRadius: '12px',
                background: `linear-gradient(135deg, ${feature.color}20, ${feature.color}40)`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '0.75rem'
              }}>
                <feature.icon size={24} color={feature.color} />
              </div>
              <h3 style={{
                fontSize: '0.9rem',
                fontWeight: '700',
                color: '#1f2937',
                marginBottom: '0.25rem'
              }}>
                {feature.title}
              </h3>
              <p style={{
                fontSize: '0.75rem',
                color: '#6b7280',
                margin: 0
              }}>
                {feature.desc}
              </p>
            </div>
          ))}
        </div>

        {/* CTA Buttons */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <Link
            href="/login"
            className="btn"
            style={{
              background: 'white',
              color: '#667eea',
              fontWeight: '700',
              fontSize: '1.1rem',
              padding: '1rem',
              boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
              border: 'none',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.02)';
              e.currentTarget.style.boxShadow = '0 15px 40px rgba(0,0,0,0.3)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.2)';
            }}
          >
            <CheckCircle size={20} />
            {t('login')}
          </Link>
          <Link
            href="/register"
            className="btn"
            style={{
              background: 'rgba(255,255,255,0.2)',
              color: 'white',
              backdropFilter: 'blur(10px)',
              fontWeight: '600',
              fontSize: '1rem',
              padding: '1rem',
              border: '2px solid rgba(255,255,255,0.3)',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(255,255,255,0.3)';
              e.currentTarget.style.transform = 'scale(1.02)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(255,255,255,0.2)';
              e.currentTarget.style.transform = 'scale(1)';
            }}
          >
            {t('register')}
          </Link>
        </div>

        {/* Footer Text */}
        <p style={{
          textAlign: 'center',
          color: 'rgba(255,255,255,0.7)',
          fontSize: '0.75rem',
          marginTop: '2rem'
        }}>
          Trusted by thousands of drivers worldwide
        </p>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        @keyframes bounce {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
      `}</style>
    </div>
  );
}
