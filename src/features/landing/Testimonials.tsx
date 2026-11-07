import React from 'react';
import { Card } from '../../components/ui/Card';
import { Quote } from 'lucide-react';

export const Testimonials: React.FC = () =>
{
  const testimonials = [
    {
      quote:
        'You Guard replaced three disparate threat scanners in our SOC pipeline. The automated SSL chain analysis and DNS tracking saved us dozens of engineering hours.',
      author: 'Marcus Vance',
      role: 'Director of Security Architecture, CloudNode Systems',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
    },
    {
      quote:
        'The ability to test suspicious credential harvesters with instant neural heuristics allows our fraud response team to neutralize fake portals in minutes.',
      author: 'Elena Rostova',
      role: 'Senior Cyber Incident Responder, FinTrust Global',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
    },
    {
      quote:
        'Crowdsourced IOC reporting paired with real-time blacklists makes You Guard our default first-stop diagnostic platform.',
      author: 'David Chen',
      role: 'Lead DevSecOps Engineer, KubeArmor',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80',
    },
  ];

  return (
    <section className="py-16 px-4 md:px-6 relative">
      <div className="max-w-6xl mx-auto space-y-10">
        <div className="text-center space-y-2">
          <h2 className="text-3xl font-extrabold text-white">
            Trusted by Elite Cyber Defense Teams
          </h2>
          <p className="text-sm text-slate-400 max-w-lg mx-auto">
            Securing modern infrastructure and stopping zero-day phishing worldwide.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          { testimonials.map( ( t, i ) => (
            <Card
              key={ i }
              className="bg-slate-900/60 border-slate-800 p-6 flex flex-col justify-between"
            >
              <div className="space-y-4">
                <Quote className="w-6 h-6 text-cyan-400/50" />
                <p className="text-xs text-slate-300 leading-relaxed italic">
                  "{ t.quote }"
                </p>
              </div>
              <div className="flex items-center gap-3 pt-6 border-t border-slate-800/80 mt-4">
                <img
                  src={ t.avatar }
                  alt={ t.author }
                  className="w-9 h-9 rounded-full object-cover border border-cyan-500/30"
                />
                <div>
                  <h4 className="text-xs font-semibold text-white">{ t.author }</h4>
                  <p className="text-[11px] text-slate-400">{ t.role }</p>
                </div>
              </div>
            </Card>
          ) ) }
        </div>
      </div>
    </section>
  );
};
