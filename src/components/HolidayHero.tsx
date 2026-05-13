import React, { useState, useEffect, useMemo, useRef } from 'react';
import { MessageCircle, Upload, Heart, Shield, Syringe, Stethoscope, Globe, Users, Baby, Ribbon, Pill, Activity } from 'lucide-react';
import WhatsAppPickerModal from './WhatsAppPickerModal';

// Animation types matched to holiday themes
type AnimationType =
  | 'fireworks'
  | 'hearts'
  | 'snowflakes'
  | 'confetti'
  | 'ribbons'
  | 'stars'
  | 'leaves'
  | 'crosses'
  | 'drops'
  | 'sparkles'
  | 'none';

interface HolidayConfig {
  name: string;
  date: { month: number; day: number };
  endDate?: { month: number; day: number };
  headline: string;
  subheadline: string;
  description: string;
  cta: string;
  badge: string;
  gradient: string;
  accentColor: string;
  icon: React.ReactNode;
  bgImage: string;
  animation: AnimationType;
}

// --- Canvas particle animation ---
interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  alpha: number;
  color: string;
  size: number;
  rotation: number;
  rotationSpeed: number;
  type: AnimationType;
  char?: string;
  gravity: number;
  life: number;
  maxLife: number;
}

function createParticle(canvas: HTMLCanvasElement, type: AnimationType): Particle {
  const colors: Record<AnimationType, string[]> = {
    fireworks: ['#ff4444', '#ff8800', '#ffdd00', '#44ff44', '#4488ff', '#ff44ff', '#ffffff'],
    hearts: ['#ff4488', '#ff2266', '#ff88aa', '#ffaabb', '#ff6699'],
    snowflakes: ['#cce8ff', '#aaddff', '#99ccff', '#bbddff', '#ffffff'],
    confetti: ['#ff4444', '#44aaff', '#ffdd00', '#44dd44', '#ff88ff', '#ff8800', '#00ddaa'],
    ribbons: ['#ff4488', '#dd2266', '#ff6699', '#ff88bb', '#cc1155'],
    stars: ['#ffdd00', '#ffee44', '#ffcc00', '#fff176', '#ffee88'],
    leaves: ['#44aa44', '#66cc44', '#88dd44', '#33aa33', '#22bb22'],
    crosses: ['#aaddff', '#88ccff', '#66bbff', '#99ddff', '#bbeeee'],
    drops: ['#ff4444', '#dd2222', '#ff6666', '#cc3333', '#ff8888'],
    sparkles: ['#aaddff', '#88ccff', '#66aadd', '#99bbcc', '#77bbdd'],
    none: ['#ffffff'],
  };

  const palette = colors[type] || colors.confetti;
  const color = palette[Math.floor(Math.random() * palette.length)];

  const chars: Record<string, string[]> = {
    hearts: ['♥', '❤', '♡'],
    snowflakes: ['❄', '❅', '❆', '✻', '✼'],
    stars: ['★', '✦', '✧', '⭐', '✨'],
    leaves: ['🌿', '🍃', '🌱', '❧'],
    crosses: ['✚', '†', '+', '✞'],
    drops: ['💧', '•', '○'],
    ribbons: ['🎗', '❤', '♥'],
  };

  const charOptions = chars[type];
  const char = charOptions ? charOptions[Math.floor(Math.random() * charOptions.length)] : undefined;

  const fromTop = ['snowflakes', 'confetti', 'ribbons', 'leaves', 'stars'].includes(type);
  const fromBottom = ['fireworks'].includes(type);

  const x = Math.random() * canvas.width;
  const y = fromTop ? -20 : fromBottom ? canvas.height + 20 : Math.random() * canvas.height;

  const baseVy = fromTop ? 1 + Math.random() * 2.5 : fromBottom ? -(4 + Math.random() * 6) : (Math.random() - 0.5) * 2;
  const vx = (Math.random() - 0.5) * (type === 'snowflakes' ? 1 : 3);

  const maxLife = 120 + Math.random() * 180;

  return {
    x,
    y,
    vx,
    vy: baseVy,
    alpha: 0.85 + Math.random() * 0.15,
    color,
    size: type === 'fireworks' ? 2 + Math.random() * 3 : 10 + Math.random() * 16,
    rotation: Math.random() * Math.PI * 2,
    rotationSpeed: (Math.random() - 0.5) * 0.12,
    type,
    char,
    gravity: fromTop ? 0.03 : fromBottom ? 0.1 : 0,
    life: 0,
    maxLife,
  };
}

function spawnFireworkBurst(canvas: HTMLCanvasElement, particles: Particle[]) {
  const x = 0.1 * canvas.width + Math.random() * 0.8 * canvas.width;
  const y = 0.1 * canvas.height + Math.random() * 0.5 * canvas.height;
  const colors = ['#ff4444', '#ff8800', '#ffdd00', '#44ff44', '#4488ff', '#ff44ff', '#ffffff', '#00ffdd'];
  const color = colors[Math.floor(Math.random() * colors.length)];
  const count = 28 + Math.floor(Math.random() * 20);
  for (let i = 0; i < count; i++) {
    const angle = (i / count) * Math.PI * 2;
    const speed = 2 + Math.random() * 4;
    const maxLife = 60 + Math.random() * 60;
    particles.push({
      x, y,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      alpha: 1,
      color,
      size: 2 + Math.random() * 3,
      rotation: 0,
      rotationSpeed: 0,
      type: 'fireworks',
      gravity: 0.08,
      life: 0,
      maxLife,
    });
  }
}

function useParticleCanvas(type: AnimationType, active: boolean) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animRef = useRef<number>(0);
  const frameRef = useRef(0);

  useEffect(() => {
    if (!active || type === 'none') return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    particlesRef.current = [];

    // Pre-seed particles
    const initialCount = type === 'fireworks' ? 0 : 40;
    for (let i = 0; i < initialCount; i++) {
      const p = createParticle(canvas, type);
      p.y = Math.random() * canvas.height; // scatter initial positions
      particlesRef.current.push(p);
    }

    const maxParticles = type === 'fireworks' ? 300 : 80;
    const spawnRate = type === 'fireworks' ? 0 : (type === 'snowflakes' ? 60 : 30);
    const fireworkInterval = type === 'fireworks' ? 80 : 0;

    const draw = () => {
      frameRef.current++;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Spawn new particles
      if (type !== 'fireworks' && frameRef.current % spawnRate === 0 && particlesRef.current.length < maxParticles) {
        particlesRef.current.push(createParticle(canvas, type));
      }

      // Spawn firework bursts
      if (type === 'fireworks' && frameRef.current % fireworkInterval === 0) {
        spawnFireworkBurst(canvas, particlesRef.current);
      }

      ctx.save();
      particlesRef.current = particlesRef.current.filter(p => {
        p.life++;
        p.x += p.vx;
        p.vy += p.gravity;
        p.y += p.vy;
        p.rotation += p.rotationSpeed;

        const fade = p.life / p.maxLife;
        const alpha = p.alpha * (1 - fade);

        if (p.life >= p.maxLife) return false;

        // Off-screen (bottom) - recycle for non-fireworks
        if (p.y > canvas.height + 30 && type !== 'fireworks') return false;
        if (p.y < -30 && type === 'fireworks') return false;

        ctx.save();
        ctx.globalAlpha = Math.max(0, alpha);
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);

        if (p.char) {
          ctx.font = `${p.size}px serif`;
          ctx.fillStyle = p.color;
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText(p.char, 0, 0);
        } else if (type === 'confetti') {
          ctx.fillStyle = p.color;
          ctx.fillRect(-p.size / 2, -p.size / 4, p.size, p.size / 2);
        } else if (type === 'fireworks') {
          ctx.beginPath();
          ctx.arc(0, 0, p.size, 0, Math.PI * 2);
          ctx.fillStyle = p.color;
          ctx.fill();
          // Tail glow
          ctx.shadowBlur = 6;
          ctx.shadowColor = p.color;
          ctx.fill();
          ctx.shadowBlur = 0;
        } else {
          ctx.beginPath();
          ctx.arc(0, 0, p.size / 2, 0, Math.PI * 2);
          ctx.fillStyle = p.color;
          ctx.fill();
        }
        ctx.restore();
        return true;
      });
      ctx.restore();

      animRef.current = requestAnimationFrame(draw);
    };

    animRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener('resize', resize);
    };
  }, [type, active]);

  return canvasRef;
}

function getEasterDate(year: number): { month: number; day: number } {
  const a = year % 19;
  const b = Math.floor(year / 100);
  const c = year % 100;
  const d = Math.floor(b / 4);
  const e = b % 4;
  const f = Math.floor((b + 8) / 25);
  const g = Math.floor((b - f + 1) / 3);
  const h = (19 * a + b - d - g + 15) % 30;
  const i = Math.floor(c / 4);
  const k = c % 4;
  const l = (32 + 2 * e + 2 * i - h - k) % 7;
  const m = Math.floor((a + 11 * h + 22 * l) / 451);
  const month = Math.floor((h + l - 7 * m + 114) / 31);
  const day = ((h + l - 7 * m + 114) % 31) + 1;
  return { month, day };
}

function getHolidayPeriod(holiday: HolidayConfig, year: number): { start: Date; end: Date } {
  const start = new Date(year, holiday.date.month - 1, holiday.date.day);
  const end = holiday.endDate
    ? new Date(year, holiday.endDate.month - 1, holiday.endDate.day)
    : new Date(year, holiday.date.month - 1, holiday.date.day + 7);
  return { start, end };
}

const HOLIDAYS: HolidayConfig[] = [
  {
    name: "New Year",
    date: { month: 1, day: 1 },
    endDate: { month: 1, day: 7 },
    headline: "Start the year with your health in focus",
    subheadline: "New Year, New Health Goals",
    description: "Begin 2025 with a commitment to your wellbeing. Happy Pills Pharmacy is here to support your health resolutions with expert consultations and quality medications.",
    cta: "Start Your Health Journey",
    badge: "Happy New Year",
    gradient: "from-primary-900 via-primary-800 to-teal-700",
    accentColor: "text-primary-300",
    icon: <Globe className="w-8 h-8" />,
    bgImage: "https://iili.io/FOS1c42.jpg",
    animation: "fireworks",
  },
  {
    name: "World Cancer Day",
    date: { month: 2, day: 4 },
    endDate: { month: 2, day: 10 },
    headline: "Together we can reduce the impact of cancer",
    subheadline: "World Cancer Day",
    description: "Early detection saves lives. Consult our pharmacists about cancer screening, supportive care medications, and nutritional supplements for patients and survivors.",
    cta: "Get Cancer Care Support",
    badge: "World Cancer Day",
    gradient: "from-purple-900 via-purple-800 to-fuchsia-700",
    accentColor: "text-purple-300",
    icon: <Ribbon className="w-8 h-8" />,
    bgImage: "https://iili.io/FOS1c42.jpg",
    animation: "ribbons",
  },
  {
    name: "International Women's Day",
    date: { month: 3, day: 8 },
    endDate: { month: 3, day: 14 },
    headline: "Empowering women's health, empowering Uganda",
    subheadline: "International Women's Day",
    description: "Celebrate the women in your life by prioritizing their health. From maternal care to wellness supplements, we support women's health at every stage.",
    cta: "Support Women's Health",
    badge: "International Women's Day",
    gradient: "from-rose-900 via-rose-800 to-pink-700",
    accentColor: "text-rose-300",
    icon: <Heart className="w-8 h-8" />,
    bgImage: "https://iili.io/FOS1c42.jpg",
    animation: "hearts",
  },
  {
    name: "World Tuberculosis Day",
    date: { month: 3, day: 24 },
    endDate: { month: 3, day: 30 },
    headline: "Yes! We can end TB in Uganda",
    subheadline: "World TB Day",
    description: "Tuberculosis is treatable and curable. Our pharmacists provide TB medication support, DOTS adherence counseling, and nutritional guidance for patients undergoing treatment.",
    cta: "Get TB Support",
    badge: "World TB Day",
    gradient: "from-blue-900 via-blue-800 to-sky-700",
    accentColor: "text-blue-300",
    icon: <Shield className="w-8 h-8" />,
    bgImage: "https://iili.io/FOS1c42.jpg",
    animation: "sparkles",
  },
  {
    name: "World Health Day",
    date: { month: 4, day: 7 },
    endDate: { month: 4, day: 13 },
    headline: "Health is a right, not a privilege",
    subheadline: "World Health Day",
    description: "Access to quality healthcare starts with a trusted pharmacy. Happy Pills Pharmacy provides affordable medications, professional consultations, and health education for all Ugandans.",
    cta: "Access Quality Healthcare",
    badge: "World Health Day",
    gradient: "from-primary-900 via-teal-800 to-cyan-700",
    accentColor: "text-teal-300",
    icon: <Stethoscope className="w-8 h-8" />,
    bgImage: "https://iili.io/FOS1c42.jpg",
    animation: "crosses",
  },
  {
    name: "World Immunization Week",
    date: { month: 4, day: 24 },
    endDate: { month: 4, day: 30 },
    headline: "Vaccines protect everyone — get immunized today",
    subheadline: "World Immunization Week",
    description: "Immunization saves millions of lives each year. We provide vaccination information, travel health consultations, and immune-boosting supplements for the whole family.",
    cta: "Learn About Immunization",
    badge: "Immunization Week",
    gradient: "from-sky-900 via-sky-800 to-blue-700",
    accentColor: "text-sky-300",
    icon: <Syringe className="w-8 h-8" />,
    bgImage: "https://iili.io/FOS1c42.jpg",
    animation: "sparkles",
  },
  {
    name: "World Malaria Day",
    date: { month: 4, day: 25 },
    endDate: { month: 5, day: 1 },
    headline: "End malaria for good — protect your family",
    subheadline: "World Malaria Day",
    description: "Malaria remains a leading health challenge in Uganda. Get antimalarials, mosquito repellents, and rapid test kits. Our pharmacists provide prevention guidance and treatment support.",
    cta: "Get Malaria Protection",
    badge: "World Malaria Day",
    gradient: "from-amber-900 via-amber-800 to-yellow-700",
    accentColor: "text-amber-300",
    icon: <Syringe className="w-8 h-8" />,
    bgImage: "https://iili.io/FOS1c42.jpg",
    animation: "drops",
  },
  {
    name: "Mother's Day",
    date: { month: 5, day: 10 },
    endDate: { month: 5, day: 17 },
    headline: "Celebrate the mothers who care for everyone",
    subheadline: "Mother's Day",
    description: "Mothers put everyone's health first. This Mother's Day, put hers first. From prenatal vitamins to chronic disease management, we help mothers stay healthy for their families.",
    cta: "Care for Mom's Health",
    badge: "Mother's Day",
    gradient: "from-pink-900 via-pink-800 to-rose-700",
    accentColor: "text-pink-300",
    icon: <Baby className="w-8 h-8" />,
    bgImage: "https://iili.io/FOS1c42.jpg",
    animation: "hearts",
  },
  {
    name: "Global Day of Parents",
    date: { month: 6, day: 1 },
    endDate: { month: 6, day: 7 },
    headline: "Supporting parents who support families",
    subheadline: "Global Day of Parents",
    description: "Parents carry the weight of family health. We provide affordable medications, pediatric care, and chronic disease management to help parents stay strong for their children.",
    cta: "Support Parent Health",
    badge: "Global Day of Parents",
    gradient: "from-sky-900 via-sky-800 to-blue-700",
    accentColor: "text-sky-300",
    icon: <Users className="w-8 h-8" />,
    bgImage: "https://iili.io/FOS1c42.jpg",
    animation: "confetti",
  },
  {
    name: "Uganda Martyrs Day",
    date: { month: 6, day: 3 },
    endDate: { month: 6, day: 9 },
    headline: "Honoring our heritage, protecting our health",
    subheadline: "Uganda Martyrs Day",
    description: "As Uganda celebrates this national holiday, Happy Pills Pharmacy remains committed to accessible healthcare for all communities across Kampala, Wakiso, Mukono, and Jinja.",
    cta: "Access Healthcare Services",
    badge: "Uganda Martyrs Day",
    gradient: "from-red-900 via-red-800 to-orange-700",
    accentColor: "text-red-300",
    icon: <Shield className="w-8 h-8" />,
    bgImage: "https://iili.io/FOS1c42.jpg",
    animation: "crosses",
  },
  {
    name: "World Blood Donor Day",
    date: { month: 6, day: 14 },
    endDate: { month: 6, day: 20 },
    headline: "Give blood, give life — support blood donation",
    subheadline: "World Blood Donor Day",
    description: "Blood donation saves lives. We support blood donors with iron supplements, hydration guidance, and post-donation care. Visit us for health products that support your donation journey.",
    cta: "Support Blood Donation",
    badge: "World Blood Donor Day",
    gradient: "from-red-900 via-red-800 to-rose-700",
    accentColor: "text-red-300",
    icon: <Activity className="w-8 h-8" />,
    bgImage: "https://iili.io/FOS1c42.jpg",
    animation: "drops",
  },
  {
    name: "African Child Day",
    date: { month: 6, day: 16 },
    endDate: { month: 6, day: 22 },
    headline: "Healthy children, healthy Uganda's future",
    subheadline: "Day of the African Child",
    description: "Every child deserves access to quality healthcare. From pediatric medications to vaccination support and nutritional supplements, we help parents keep their children healthy.",
    cta: "Support Child Health",
    badge: "Day of the African Child",
    gradient: "from-emerald-900 via-emerald-800 to-green-700",
    accentColor: "text-emerald-300",
    icon: <Baby className="w-8 h-8" />,
    bgImage: "https://iili.io/FOS1c42.jpg",
    animation: "confetti",
  },
  {
    name: "World Hepatitis Day",
    date: { month: 7, day: 28 },
    endDate: { month: 8, day: 3 },
    headline: "Hepatitis can't wait — get tested, get treated",
    subheadline: "World Hepatitis Day",
    description: "Viral hepatitis affects millions in Africa. We offer liver health supplements, hepatitis screening referrals, and medication support for patients undergoing treatment.",
    cta: "Get Hepatitis Support",
    badge: "World Hepatitis Day",
    gradient: "from-amber-900 via-yellow-800 to-amber-700",
    accentColor: "text-amber-300",
    icon: <Pill className="w-8 h-8" />,
    bgImage: "https://iili.io/FOS1c42.jpg",
    animation: "sparkles",
  },
  {
    name: "Pharmacy Anniversary",
    date: { month: 9, day: 1 },
    endDate: { month: 9, day: 7 },
    headline: "Celebrating years of trusted healthcare in Uganda",
    subheadline: "Happy Pills Pharmacy Anniversary",
    description: "Thank you Uganda! We're celebrating our pharmacy anniversary with special offers, free consultations, and exclusive discounts for our loyal customers. A year older, a year better — your health is our greatest achievement.",
    cta: "Celebrate With Us",
    badge: "Anniversary Celebrations",
    gradient: "from-amber-950 via-amber-900 to-yellow-700",
    accentColor: "text-yellow-300",
    icon: <Heart className="w-8 h-8" />,
    bgImage: "https://iili.io/FOS1c42.jpg",
    animation: "fireworks",
  },
  {
    name: "Black November",
    date: { month: 11, day: 1 },
    endDate: { month: 11, day: 30 },
    headline: "Biggest discounts of the year — all November long",
    subheadline: "Black November Week",
    description: "Happy Pills Pharmacy's Black November is here! Enjoy massive discounts on medicines, wellness products, and health supplements throughout November. Stock up, save big, and keep your family healthy.",
    cta: "Shop Black November Deals",
    badge: "Black November",
    gradient: "from-neutral-950 via-neutral-900 to-neutral-800",
    accentColor: "text-yellow-400",
    icon: <Pill className="w-8 h-8" />,
    bgImage: "https://iili.io/FOS1c42.jpg",
    animation: "confetti",
  },
  {
    name: "Uganda Independence Day",
    date: { month: 10, day: 9 },
    endDate: { month: 10, day: 15 },
    headline: "Independent Uganda, healthy Ugandans",
    subheadline: "Uganda Independence Day",
    description: "Celebrating our nation's independence with a commitment to accessible healthcare. Happy Pills Pharmacy serves communities across Uganda with quality medications and professional care.",
    cta: "Celebrate with Health",
    badge: "Independence Day",
    gradient: "from-neutral-900 via-neutral-800 to-amber-700",
    accentColor: "text-amber-300",
    icon: <Globe className="w-8 h-8" />,
    bgImage: "https://iili.io/FOS1c42.jpg",
    animation: "fireworks",
  },
  {
    name: "World Mental Health Day",
    date: { month: 10, day: 10 },
    endDate: { month: 10, day: 16 },
    headline: "Mental health is health — break the silence",
    subheadline: "World Mental Health Day",
    description: "Mental health matters. We provide mental health medication, stress management supplements, and confidential pharmacist consultations. Your mental wellbeing is our priority.",
    cta: "Get Mental Health Support",
    badge: "World Mental Health Day",
    gradient: "from-teal-900 via-teal-800 to-cyan-700",
    accentColor: "text-teal-300",
    icon: <Heart className="w-8 h-8" />,
    bgImage: "https://iili.io/FOS1c42.jpg",
    animation: "hearts",
  },
  {
    name: "World Diabetes Day",
    date: { month: 11, day: 14 },
    endDate: { month: 11, day: 20 },
    headline: "Access to diabetes care — if not now, when?",
    subheadline: "World Diabetes Day",
    description: "Diabetes affects millions of Ugandans. We provide blood glucose monitors, insulin supplies, dietary supplements, and expert pharmacist consultations for diabetes management.",
    cta: "Manage Diabetes Better",
    badge: "World Diabetes Day",
    gradient: "from-blue-900 via-sky-800 to-cyan-700",
    accentColor: "text-sky-300",
    icon: <Activity className="w-8 h-8" />,
    bgImage: "https://iili.io/FOS1c42.jpg",
    animation: "sparkles",
  },
  {
    name: "World Pneumonia Day",
    date: { month: 11, day: 12 },
    endDate: { month: 11, day: 18 },
    headline: "Stop pneumonia — protect every breath",
    subheadline: "World Pneumonia Day",
    description: "Pneumonia is a leading cause of child mortality in Uganda. We provide antibiotics, respiratory care products, and immune support. Early treatment saves lives.",
    cta: "Get Respiratory Care",
    badge: "World Pneumonia Day",
    gradient: "from-slate-900 via-slate-800 to-gray-700",
    accentColor: "text-slate-300",
    icon: <Activity className="w-8 h-8" />,
    bgImage: "https://iili.io/FOS1c42.jpg",
    animation: "sparkles",
  },
  {
    name: "World AIDS Day",
    date: { month: 12, day: 1 },
    endDate: { month: 12, day: 14 },
    headline: "End the stigma, know your status, save lives",
    subheadline: "World AIDS Day",
    description: "HIV/AIDS remains a critical health issue in Uganda. We provide antiretroviral support, immune-boosting supplements, confidential consultations, and referral services. Together, we can end AIDS.",
    cta: "Get HIV/AIDS Support",
    badge: "World AIDS Day",
    gradient: "from-red-950 via-red-900 to-red-700",
    accentColor: "text-red-300",
    icon: <Ribbon className="w-8 h-8" />,
    bgImage: "https://iili.io/FOS1c42.jpg",
    animation: "ribbons",
  },
  {
    name: "International Day of Persons with Disabilities",
    date: { month: 12, day: 3 },
    endDate: { month: 12, day: 9 },
    headline: "Accessible healthcare for every Ugandan",
    subheadline: "Disability Awareness Day",
    description: "Healthcare must be accessible to all. Happy Pills Pharmacy provides assistive health products, chronic disease management, and personalized care for persons with disabilities.",
    cta: "Access Inclusive Healthcare",
    badge: "Disability Awareness",
    gradient: "from-orange-900 via-orange-800 to-amber-700",
    accentColor: "text-orange-300",
    icon: <Users className="w-8 h-8" />,
    bgImage: "https://iili.io/FOS1c42.jpg",
    animation: "stars",
  },
  {
    name: "Christmas",
    date: { month: 12, day: 25 },
    endDate: { month: 12, day: 31 },
    headline: "The gift of health this Christmas season",
    subheadline: "Merry Christmas",
    description: "This festive season, give the gift that matters most — health. From wellness gift packs to essential medications, Happy Pills Pharmacy keeps your family healthy through the holidays.",
    cta: "Gift Health This Christmas",
    badge: "Merry Christmas",
    gradient: "from-green-900 via-green-800 to-emerald-700",
    accentColor: "text-green-300",
    icon: <Heart className="w-8 h-8" />,
    bgImage: "https://iili.io/FOS1c42.jpg",
    animation: "snowflakes",
  },
];

const DEFAULT_HERO: Omit<HolidayConfig, 'date' | 'animation'> = {
  name: "Default",
  headline: "Provider-centered solutions for patient-centered care",
  subheadline: "Your Trusted Healthcare Partner",
  description: "Helping Ugandans access quality pharmaceutical care with leading-edge services, professional consultations, and a patient-friendly platform across Kampala, Wakiso, Mukono & Jinja.",
  cta: "Consult on WhatsApp",
  badge: "Licensed Pharmacy",
  gradient: "from-neutral-900 via-neutral-900/90 to-neutral-900/60",
  accentColor: "text-primary-400",
  icon: <Pill className="w-8 h-8" />,
  bgImage: "https://iili.io/FOS1c42.jpg",
};

function getCurrentHoliday(): HolidayConfig | null {
  const now = new Date();
  const year = now.getFullYear();

  for (const holiday of HOLIDAYS) {
    const { start, end } = getHolidayPeriod(holiday, year);
    if (now >= start && now <= end) {
      return holiday;
    }
  }

  return null;
}

function getUpcomingHoliday(): HolidayConfig | null {
  const now = new Date();
  const year = now.getFullYear();

  let closest: HolidayConfig | null = null;
  let closestDiff = Infinity;

  for (const holiday of HOLIDAYS) {
    const { start } = getHolidayPeriod(holiday, year);
    const diff = start.getTime() - now.getTime();
    if (diff > 0 && diff < closestDiff) {
      closestDiff = diff;
      closest = holiday;
    }
  }

  return closest;
}

export default function HolidayHero() {
  const [isVisible, setIsVisible] = useState(false);
  const [showWhatsAppPicker, setShowWhatsAppPicker] = useState(false);
  const [whatsAppMessage, setWhatsAppMessage] = useState('');

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const currentHoliday = useMemo(() => getCurrentHoliday(), []);
  const upcomingHoliday = useMemo(() => getUpcomingHoliday(), []);

  const hero = currentHoliday || DEFAULT_HERO;
  const isHolidayActive = currentHoliday !== null;
  const animationType: AnimationType = (currentHoliday as HolidayConfig | null)?.animation ?? 'none';

  const canvasRef = useParticleCanvas(animationType, isHolidayActive);

  return (
    <>
    <section className="relative bg-neutral-900 overflow-hidden pt-16 md:pt-20">
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src={hero.bgImage}
          alt=""
          className="w-full h-full object-cover opacity-30"
        />
        <div className={`absolute inset-0 bg-gradient-to-r ${hero.gradient}`}></div>
      </div>

      {/* Particle canvas */}
      {isHolidayActive && animationType !== 'none' && (
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full pointer-events-none"
          style={{ zIndex: 2 }}
        />
      )}

      <div
        className={`relative py-20 md:py-32 lg:py-40 transition-opacity duration-700 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
        style={{ zIndex: 3 }}
      >
        <div className="section-container">
          <div className="max-w-3xl">
            {/* Black November discount strip */}
            {currentHoliday?.name === 'Black November' && (
              <div className="mb-6 flex flex-wrap gap-3">
                {[
                  { label: 'Up to 30% OFF', sub: 'Medicines' },
                  { label: 'Up to 25% OFF', sub: 'Wellness Products' },
                  { label: 'Up to 20% OFF', sub: 'Supplements' },
                  { label: 'FREE', sub: 'Consultation' },
                ].map((deal, i) => (
                  <div key={i} className="bg-yellow-400 text-neutral-950 rounded-xl px-4 py-2 text-center shadow-lg">
                    <p className="font-black text-sm leading-none">{deal.label}</p>
                    <p className="text-xs font-semibold opacity-75 mt-0.5">{deal.sub}</p>
                  </div>
                ))}
              </div>
            )}

            {/* Anniversary discount strip */}
            {currentHoliday?.name === 'Pharmacy Anniversary' && (
              <div className="mb-6 flex flex-wrap gap-3">
                {[
                  { label: 'Anniversary SALE', sub: 'Special Discounts' },
                  { label: 'FREE', sub: 'Consultation' },
                  { label: 'GIFT', sub: 'With Purchase' },
                ].map((deal, i) => (
                  <div key={i} className="bg-yellow-300 text-neutral-950 rounded-xl px-4 py-2 text-center shadow-lg">
                    <p className="font-black text-sm leading-none">{deal.label}</p>
                    <p className="text-xs font-semibold opacity-75 mt-0.5">{deal.sub}</p>
                  </div>
                ))}
              </div>
            )}

            <div className="flex flex-wrap gap-2 mb-6">
              {isHolidayActive ? (
                <>
                  <span className="badge bg-white/15 text-white border border-white/20">
                    {hero.badge}
                  </span>
                  <span className="badge bg-accent-500/20 text-accent-300 border border-accent-500/30">
                    On-Demand Imports
                  </span>
                  <span className="badge bg-white/10 text-white/80 border border-white/20">
                    24/7 Service
                  </span>
                </>
              ) : (
                <>
                  <span className="badge bg-primary-500/20 text-primary-300 border border-primary-500/30">
                    Licensed Pharmacy
                  </span>
                  <span className="badge bg-accent-500/20 text-accent-300 border border-accent-500/30">
                    On-Demand Imports
                  </span>
                  <span className="badge bg-white/10 text-white/80 border border-white/20">
                    24/7 Service
                  </span>
                </>
              )}
            </div>

            {isHolidayActive && (
              <div className="flex items-center gap-3 mb-4">
                <div className={`w-12 h-12 rounded-xl bg-white/10 ${hero.accentColor} flex items-center justify-center`}>
                  {hero.icon}
                </div>
                <p className={`text-sm font-semibold ${hero.accentColor} tracking-wide uppercase`}>
                  {hero.subheadline}
                </p>
              </div>
            )}

            <h1 className="heading-xl text-white mb-6">
              {isHolidayActive ? (
                <>
                  {hero.headline.split(' ').map((word, i, arr) =>
                    i === arr.length - 1 ? (
                      <span key={i} className={hero.accentColor}> {word}</span>
                    ) : (
                      <span key={i}>{word} </span>
                    )
                  )}
                </>
              ) : (
                <>
                  Provider-centered solutions for
                  <span className="text-primary-400"> patient-centered care</span>
                </>
              )}
            </h1>

            <p className="text-lg md:text-xl text-neutral-300 mb-10 leading-relaxed max-w-2xl">
              {hero.description}
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => {
                  const message = isHolidayActive
                    ? `Hello Happy Pills Pharmacy! I'm reaching out regarding ${hero.badge}. ${hero.cta}`
                    : "Hello Happy Pills Pharmacy! I need assistance with my medication needs.";
                  setWhatsAppMessage(message);
                  setShowWhatsAppPicker(true);
                }}
                className="btn-primary text-base py-4 px-8"
              >
                <MessageCircle className="w-5 h-5 mr-2" />
                {hero.cta}
              </button>
              <button
                onClick={() => document.getElementById('upload')?.scrollIntoView({ behavior: 'smooth' })}
                className="btn-secondary text-base py-4 px-8 border-white/30 text-neutral-900 hover:bg-white/90 font-semibold"
              >
                <Upload className="w-5 h-5 mr-2" />
                Upload Prescription
              </button>
            </div>

            {!isHolidayActive && upcomingHoliday && (
              <div className="mt-10 pt-8 border-t border-white/10">
                <p className="text-sm text-neutral-400">
                  <span className="text-neutral-300 font-medium">Coming up:</span>{' '}
                  {upcomingHoliday.badge} — {upcomingHoliday.headline}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>

      {showWhatsAppPicker && (
        <WhatsAppPickerModal
          onClose={() => setShowWhatsAppPicker(false)}
          message={whatsAppMessage}
          title="WhatsApp Us"
        />
      )}
    </>
  );
}
