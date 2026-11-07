import React, { useState } from 'react';
import { Modal } from '../../components/ui/Modal';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { RiskLevel } from '../../types/scan.types';
import { communityService } from '../../services/community.service';
import { ShieldAlert, Globe, FileText, Tag, ArrowRight } from 'lucide-react';

export interface ReportSubmissionModalProps
{
  isOpen: boolean;
  onClose: () => void;
  onSubmitted: () => void;
}

export const ReportSubmissionModal: React.FC<ReportSubmissionModalProps> = ( {
  isOpen,
  onClose,
  onSubmitted,
} ) =>
{
  const [ target, setTarget ] = useState( '' );
  const [ threatType, setThreatType ] = useState( 'Phishing Form' );
  const [ riskLevel, setRiskLevel ] = useState<RiskLevel>( 'critical' );
  const [ description, setDescription ] = useState( '' );
  const [ evidenceUrl, setEvidenceUrl ] = useState( '' );
  const [ tagsInput, setTagsInput ] = useState( 'credential-theft, bank-phish' );
  const [ isSubmitting, setIsSubmitting ] = useState( false );

  const handleSubmit = async ( e: React.FormEvent ) =>
  {
    e.preventDefault();
    if ( !target || !description ) return;

    setIsSubmitting( true );
    try
    {
      const tags = tagsInput
        .split( ',' )
        .map( ( t ) => t.trim() )
        .filter( Boolean );

      await communityService.submitReport( {
        target,
        threatType,
        riskLevel,
        description,
        evidenceUrl: evidenceUrl || undefined,
        reportedBy: 'SOC_Analyst_User',
        reporterReputation: 120,
        tags,
      } );

      setIsSubmitting( false );
      onSubmitted();
      onClose();
    } catch
    {
      setIsSubmitting( false );
    }
  };

  return (
    <Modal
      isOpen={ isOpen }
      onClose={ onClose }
      title="Submit Suspicious Incident"
      description="Help protect thousands of organizations by crowdsourcing zero-day malicious targets."
      maxWidth="lg"
    >
      <form onSubmit={ handleSubmit } className="space-y-4 pt-2">
        <Input
          label="Suspicious Domain / URL"
          type="text"
          value={ target }
          onChange={ ( e ) => setTarget( e.target.value ) }
          placeholder="https://malicious-login.portal.top/auth"
          leftIcon={ <Globe className="w-4 h-4" /> }
          required
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1.5">
              Threat Classification
            </label>
            <select
              value={ threatType }
              onChange={ ( e ) => setThreatType( e.target.value ) }
              className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-slate-100 focus:outline-none focus:border-cyan-500"
            >
              <option value="Phishing Form">Phishing Form</option>
              <option value="Malware Dropper">Malware Dropper</option>
              <option value="C2 Beacon">C2 Beacon</option>
              <option value="Web3 Drainer">Web3 Drainer</option>
              <option value="SMS Smishing Kit">SMS Smishing Kit</option>
              <option value="Deceptive Redirect">Deceptive Redirect</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1.5">
              Assessed Severity Level
            </label>
            <select
              value={ riskLevel }
              onChange={ ( e ) => setRiskLevel( e.target.value as RiskLevel ) }
              className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-slate-100 focus:outline-none focus:border-cyan-500"
            >
              <option value="critical">Critical (Immediate Data Loss)</option>
              <option value="malicious">Malicious (Active Exploit)</option>
              <option value="suspicious">Suspicious (Anomalous)</option>
              <option value="low">Low Risk</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-xs font-medium text-slate-300 mb-1.5">
            Incident Description & Context
          </label>
          <textarea
            value={ description }
            onChange={ ( e ) => setDescription( e.target.value ) }
            placeholder="Describe behavior, spoofed brand, email headers, or payload artifacts..."
            rows={ 3 }
            className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3.5 py-2 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500"
            required
          />
        </div>

        <Input
          label="Tags (comma-separated)"
          type="text"
          value={ tagsInput }
          onChange={ ( e ) => setTagsInput( e.target.value ) }
          placeholder="banking, otp-bypass, sms"
          leftIcon={ <Tag className="w-4 h-4" /> }
        />

        <div className="pt-2 flex justify-end gap-2">
          <Button variant="ghost" size="sm" type="button" onClick={ onClose }>
            Cancel
          </Button>
          <Button
            variant="cyber"
            size="sm"
            type="submit"
            isLoading={ isSubmitting }
            rightIcon={ <ArrowRight className="w-4 h-4" /> }
          >
            Publish Incident to Mesh
          </Button>
        </div>
      </form>
    </Modal>
  );
};
