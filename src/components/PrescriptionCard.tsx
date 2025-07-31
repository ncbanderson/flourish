import React, { useState } from 'react';
import { BookOpen, Music, ChevronDown, ChevronUp, Copy, Check } from 'lucide-react';
import { Prescription } from '../types';

interface PrescriptionCardProps {
  prescription: Prescription;
}

export function PrescriptionCard({ prescription }: PrescriptionCardProps) {
  const [showFullPoem, setShowFullPoem] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-indigo-100 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-4 text-white">
        <h3 className="font-semibold text-lg">Your Prescription</h3>
        <p className="text-indigo-100 text-sm">For: {prescription.mood}</p>
      </div>

      <div className="p-6 space-y-6">
        {/* Poetry Section */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-indigo-600" />
            <h4 className="font-semibold text-gray-800">Poetry</h4>
          </div>
          
          <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl p-4">
            <div className="flex items-start justify-between mb-2">
              <div>
                <h5 className="font-medium text-gray-800">{prescription.poem.title}</h5>
                <p className="text-sm text-gray-600">by {prescription.poem.author}</p>
              </div>
              <button
                onClick={() => handleCopy(prescription.poem.fullText || prescription.poem.excerpt)}
                className="p-1 hover:bg-white/50 rounded transition-colors"
                title="Copy poem"
              >
                {copied ? (
                  <Check className="w-4 h-4 text-green-600" />
                ) : (
                  <Copy className="w-4 h-4 text-gray-500" />
                )}
              </button>
            </div>
            
            <div className="text-sm text-gray-700 leading-relaxed">
              <p className="italic">
                {showFullPoem && prescription.poem.fullText 
                  ? prescription.poem.fullText 
                  : prescription.poem.excerpt}
              </p>
              
              {prescription.poem.fullText && prescription.poem.fullText !== prescription.poem.excerpt && (
                <button
                  onClick={() => setShowFullPoem(!showFullPoem)}
                  className="flex items-center gap-1 mt-2 text-indigo-600 hover:text-indigo-700 transition-colors"
                >
                  {showFullPoem ? (
                    <>
                      <ChevronUp className="w-4 h-4" />
                      Show less
                    </>
                  ) : (
                    <>
                      <ChevronDown className="w-4 h-4" />
                      Read full poem
                    </>
                  )}
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Music Section */}
        {prescription.music && (
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Music className="w-5 h-5 text-purple-600" />
              <h4 className="font-semibold text-gray-800">Music</h4>
            </div>
            
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-4">
              <h5 className="font-medium text-gray-800">{prescription.music.title}</h5>
              <p className="text-sm text-gray-600 mb-2">by {prescription.music.artist}</p>
              <p className="text-xs text-purple-600 font-medium mb-2">{prescription.music.genre}</p>
              <p className="text-sm text-gray-700">{prescription.music.description}</p>
            </div>
          </div>
        )}

        {/* Reasoning */}
        <div className="space-y-3">
          <h4 className="font-semibold text-gray-800">Why this prescription?</h4>
          <p className="text-sm text-gray-600 leading-relaxed bg-gray-50 rounded-xl p-4">
            {prescription.reasoning}
          </p>
        </div>

        {/* Timestamp */}
        <div className="text-xs text-gray-500 text-center pt-4 border-t border-gray-100">
          Prescribed on {prescription.timestamp.toLocaleDateString()} at{' '}
          {prescription.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </div>
      </div>
    </div>
  );
}