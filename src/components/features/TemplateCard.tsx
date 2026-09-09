import React from 'react';
import { Template } from '@/types/template';
import TemplateRenderer from './TemplateRenderer';
import { Edit2, Sun } from 'lucide-react';

interface Props {
  template: Template;
  onClick: (template: Template) => void;
  hasCustomText?: boolean;
}

const TemplateCard: React.FC<Props> = ({ template, onClick, hasCustomText }) => {
  return (
    <div className="cursor-pointer group relative" onClick={() => onClick(template)}>
      <div className="relative overflow-hidden rounded-lg transition-all duration-300 group-hover:scale-105 group-hover:z-10">
        <TemplateRenderer template={template} mini={true} />
        {/* Light indicator */}
        {template.isLight && (
          <div className="absolute top-1 left-1 w-4 h-4 rounded-full flex items-center justify-center"
            style={{ background: 'rgba(255,255,255,0.85)', boxShadow: '0 0 4px rgba(255,215,0,0.6)' }}>
            <Sun className="w-2.5 h-2.5 text-amber-500" />
          </div>
        )}
        {/* Hover overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300 rounded-lg flex items-center justify-center">
          <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="bg-white bg-opacity-15 backdrop-blur-sm rounded-full px-2.5 py-1 text-white text-xs font-medium border border-white border-opacity-30 flex items-center gap-1">
              <Edit2 className="w-2.5 h-2.5" />
              Open
            </div>
          </div>
        </div>
        {/* Custom text indicator */}
        {hasCustomText && (
          <div className="absolute top-1 right-1 w-2.5 h-2.5 rounded-full"
            style={{ background: 'linear-gradient(135deg, #ffd700, #c41e3a)', boxShadow: '0 0 4px rgba(255,215,0,0.8)' }} />
        )}
      </div>
    </div>
  );
};

export default TemplateCard;
