import React, { useState } from 'react';

export const VisionAnalysis: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
    }
  };

  const handleAnalyze = () => {
    if (!file) return;
    setAnalyzing(true);
    // Mock vision analysis delay
    setTimeout(() => {
      setAnalyzing(false);
      setResult("AI Vision Detected: Formation appears to be a 4-3-3. The opposition is employing a mid-block. Notice the spacing between the center-backs and defensive midfielder is approximately 15 yards, allowing pockets of space for the attacking #10 to drop into.");
    }, 2500);
  };

  return (
    <div className="glass-panel" style={{ padding: '30px', borderRadius: '16px' }}>
      <h2 style={{ color: '#00ff88', marginTop: 0, marginBottom: '20px' }}>AI Vision Analysis</h2>
      <p style={{ color: '#ccc', marginBottom: '30px' }}>
        Upload a match photo or screenshot. Our Vision AI will identify formations, player positioning, and tactical setups.
      </p>

      <div 
        onDragOver={e => e.preventDefault()} 
        onDrop={handleDrop}
        style={{
          border: '2px dashed rgba(255,255,255,0.2)',
          borderRadius: '12px',
          padding: '50px 20px',
          textAlign: 'center',
          cursor: 'pointer',
          background: 'rgba(0,0,0,0.2)',
          marginBottom: '20px'
        }}
        onClick={() => document.getElementById('vision-upload')?.click()}
      >
        <input 
          type="file" 
          id="vision-upload" 
          style={{ display: 'none' }} 
          accept="image/*"
          onChange={e => e.target.files && setFile(e.target.files[0])}
        />
        <div style={{ fontSize: '40px', marginBottom: '10px' }}>📸</div>
        <div style={{ color: '#00ff88', fontWeight: 'bold' }}>
          {file ? file.name : "Drag & Drop Image or Click to Browse"}
        </div>
      </div>

      <button 
        onClick={handleAnalyze} 
        disabled={!file || analyzing}
        style={{
          width: '100%',
          padding: '15px',
          background: (!file || analyzing) ? '#333' : '#00ff88',
          color: (!file || analyzing) ? '#888' : '#121214',
          border: 'none',
          borderRadius: '8px',
          fontWeight: 'bold',
          cursor: (!file || analyzing) ? 'not-allowed' : 'pointer'
        }}
      >
        {analyzing ? 'Analyzing Image...' : 'Analyze Match Photo'}
      </button>

      {result && (
        <div style={{ marginTop: '30px', padding: '20px', background: 'rgba(0,255,136,0.1)', border: '1px solid #00ff88', borderRadius: '8px' }}>
          <h3 style={{ marginTop: 0, color: '#00ff88' }}>🔍 Vision Analysis Result</h3>
          <p style={{ lineHeight: '1.6', color: '#fff', margin: 0 }}>{result}</p>
        </div>
      )}
    </div>
  );
};
