import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  ShieldCheck,
  Globe,
  Activity,
  Search,
  Network
} from 'lucide-react';

const modules = [
  { name: 'Web Security Assessment', icon: Globe },
  { name: 'Certificate Validation', icon: ShieldCheck },
  { name: 'Dynamic Threat Analysis', icon: Activity },
  { name: 'Threat Intelligence', icon: Network }
];

export default function ScanProgress() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setProgress(old => Math.min(old + 10, 100));
    }, 350);

    return () => window.clearInterval(interval);
  }, []);

  return (
    <>
      <div className="header">
        <div>
          <div className="eyebrow">SCAN ENGINE</div>
          <h1>Security Assessment</h1>
          <p className="muted">Reference: {id}</p>
        </div>

        <span className="badge">Demo workflow</span>
      </div>

      <section className="panel center">
        <Search size={38} color="#42cce8" />

        <h2>
          {progress === 100
            ? 'Assessment workflow completed'
            : 'Analysing website security'}
        </h2>

        <div className="progress">
          <i style={{ width: `${progress}%` }} />
        </div>

        <h2>{progress}%</h2>

        <p className="muted">
          Demonstration progress only.
        </p>

        {progress === 100 && (
          <button
            className="btn primary"
            onClick={() => navigate(`/scans/${id}`)}
          >
            View Security Report
          </button>
        )}
      </section>

      <section className="grid2">
        {modules.map((module, index) => {
          const Icon = module.icon;

          const completed = progress >= (index + 1) * 25;

          return (
            <div className="panel" key={module.name}>
              <Icon color="#42cce8" size={25} />

              <h3>{module.name}</h3>

              <div className="progress">
                <i
                  style={{
                    width: completed
                      ? '100%'
                      : `${Math.min(progress * 4, 80)}%`
                  }}
                />
              </div>

              <span className="badge">
                {completed ? 'Demo completed' : 'Processing'}
              </span>
            </div>
          );
        })}
      </section>
    </>
  );
}
