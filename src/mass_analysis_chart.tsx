import { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from 'recharts';

const MassAnalysisChart = () => {
  const [chartType, setChartType] = useState('line');
  const [showComplete, setShowComplete] = useState(true);
  const [showDense, setShowDense] = useState(true);
  const [visibleSections, setVisibleSections] = useState({
    'Introit': true,
    'Kyrie': true,
    'Gradual': true,
    'Offertory': true,
    'Sanctus': true,
    'Agnus Dei': true,
    'Communion': true
  });

  // Data extracted from the updated CSV - Updated Numbers 2
  const data = [
    {
      section: 'Introit',
      position: 1,
      type: 'Proper',
      'Richafort % of Completeness': 46.09,
      'Richafort % of Density': 38.54,
      'Prioris % of Completeness': 83.48,
      'Prioris % of Density': 76.64,
      'Brumel % of Completeness': 84.35,
      'Brumel % of Density': 65.04,
      'Fevin % of Completeness': 78.26,
      'Fevin % of Density': 68.47
    },
    {
      section: 'Kyrie',
      position: 2,
      type: 'Ordinary',
      'Richafort % of Completeness': 17.28,
      'Richafort % of Density': 17.94,
      'Prioris % of Completeness': 32.35,
      'Prioris % of Density': 50.0,
      'Brumel % of Completeness': 69.23,
      'Brumel % of Density': 48.65,
      'Fevin % of Completeness': 43.59,
      'Fevin % of Density': 53.97
    },
    {
      section: 'Gradual',
      position: 3,
      type: 'Proper',
      'Richafort % of Completeness': 52.77,
      'Richafort % of Density': 38.49,
      'Prioris % of Completeness': 73.19,
      'Prioris % of Density': 63.24,
      'Brumel % of Completeness': null,
      'Brumel % of Density': null,
      'Fevin % of Completeness': 51.49,
      'Fevin % of Density': 40.22
    },
    {
      section: 'Offertory',
      position: 4,
      type: 'Proper',
      'Richafort % of Completeness': 53.85,
      'Richafort % of Density': 45.89,
      'Prioris % of Completeness': 69.78,
      'Prioris % of Density': 66.28,
      'Brumel % of Completeness': null,
      'Brumel % of Density': null,
      'Fevin % of Completeness': 54.67,
      'Fevin % of Density': 53.53
    },
    {
      section: 'Sanctus',
      position: 5,
      type: 'Ordinary',
      'Richafort % of Completeness': 88.33,
      'Richafort % of Density': 50.59,
      'Prioris % of Completeness': 85.00,
      'Prioris % of Density': 50.0,
      'Brumel % of Completeness': 80.00,
      'Brumel % of Density': 64.86,
      'Fevin % of Completeness': 93.33,
      'Fevin % of Density': 65.79
    },
    {
      section: 'Agnus Dei',
      position: 6,
      type: 'Ordinary',
      'Richafort % of Completeness': 64.62,
      'Richafort % of Density': 39.76,
      'Prioris % of Completeness': 67.69,
      'Prioris % of Density': 55.56,
      'Brumel % of Completeness': 57.78,
      'Brumel % of Density': 54.17,
      'Fevin % of Completeness': 67.69,
      'Fevin % of Density': 69.09
    },
    {
      section: 'Communion',
      position: 7,
      type: 'Proper',
      'Richafort % of Completeness': 91.78,
      'Richafort % of Density': 43.24,
      'Prioris % of Completeness': 91.78,
      'Prioris % of Density': 59.76,
      'Brumel % of Completeness': 93.15,
      'Brumel % of Density': 33.78,
      'Fevin % of Completeness': 89.04,
      'Fevin % of Density': 70.15
    }
  ];

  const lineKeys = [
    'Richafort % of Completeness',
    'Richafort % of Density',
    'Prioris % of Completeness',
    'Prioris % of Density',
    'Brumel % of Completeness',
    'Brumel % of Density',
    'Fevin % of Completeness',
    'Fevin % of Density'
  ] as const;

  type LineKey = typeof lineKeys[number];

  // Updated colors to match requested scheme with shades
  const colors: Record<LineKey, string> = {
    'Richafort % of Completeness': '#DC2626', // Red - solid
    'Richafort % of Density': '#EF4444', // Red - lighter shade
    'Prioris % of Completeness': '#D97706', // Yellow/Orange - solid
    'Prioris % of Density': '#F59E0B', // Yellow - lighter shade
    'Brumel % of Completeness': '#16A34A', // Green - solid
    'Brumel % of Density': '#22C55E', // Green - lighter shade
    'Fevin % of Completeness': '#7C3AED', // Purple - solid
    'Fevin % of Density': '#A855F7' // Purple - lighter shade
  };

  const getFilteredData = () => {
    return data.filter(item => visibleSections[item.section as keyof typeof visibleSections]);
  };

  type VisibleSections = {
    Introit: boolean;
    Kyrie: boolean;
    Gradual: boolean;
    Offertory: boolean;
    Sanctus: boolean;
    'Agnus Dei': boolean;
    Communion: boolean;
  };

  const toggleSection = (section: keyof VisibleSections) => {
    setVisibleSections((prev) => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const getVisibleLines = (): LineKey[] => {
    const lines: LineKey[] = [];
    // Group by composer to keep completeness and density lines together
    const composers = ['Richafort', 'Prioris', 'Brumel', 'Fevin'];
    
    composers.forEach(composer => {
      if (showComplete) {
        lines.push(`${composer} % of Completeness` as LineKey);
      }
      if (showDense) {
        lines.push(`${composer} % of Density` as LineKey);
      }
    });
    
    return lines;
  };

  const CustomTooltip = (props: any) => {
    const { active, payload, label } = props;
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-4 border-2 border-gray-400 rounded-lg shadow-2xl backdrop-blur-sm" style={{ 
          backgroundColor: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(4px)',
          zIndex: 1000
        }}>
          <p className="font-bold text-gray-800 mb-2 text-sm bg-gray-100 px-2 py-1 rounded">{`${label}`}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} className="text-sm font-medium px-2 py-1 rounded mb-1" style={{ 
              color: entry.color,
              backgroundColor: 'rgba(255, 255, 255, 0.8)',
              border: `1px solid ${entry.color}20`
            }}>
              {`${entry.dataKey}: ${entry.value !== undefined && entry.value !== null ? Number(entry.value).toFixed(2) : 'N/A'}%`}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="w-full p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Controls */}
        <div className="flex flex-wrap justify-center gap-4 mb-6">
          <div className="flex gap-2">
            <button
              onClick={() => setChartType('line')}
              className={`px-4 py-2 rounded transition-all duration-200 transform ${
                chartType === 'line' 
                  ? 'bg-blue-500 text-white shadow-lg scale-105 ring-2 ring-blue-300' 
                  : 'bg-white text-gray-700 border border-gray-300 hover:bg-blue-50 hover:border-blue-300 hover:scale-102 active:scale-95'
              }`}
            >
              Line Chart
            </button>
            <button
              onClick={() => setChartType('bar')}
              className={`px-4 py-2 rounded transition-all duration-200 transform ${
                chartType === 'bar' 
                  ? 'bg-blue-500 text-white shadow-lg scale-105 ring-2 ring-blue-300' 
                  : 'bg-white text-gray-700 border border-gray-300 hover:bg-blue-50 hover:border-blue-300 hover:scale-102 active:scale-95'
              }`}
            >
              Bar Chart
            </button>
          </div>
          
          <div className="flex gap-2">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={showComplete}
                onChange={(e) => setShowComplete(e.target.checked)}
                className="rounded w-4 h-4 text-blue-600 focus:ring-blue-500 focus:ring-2 transition-all"
              />
              <span className={`text-sm transition-colors ${showComplete ? 'text-blue-700 font-medium' : 'text-gray-600'}`}>
                % of Completeness
              </span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={showDense}
                onChange={(e) => setShowDense(e.target.checked)}
                className="rounded w-4 h-4 text-blue-600 focus:ring-blue-500 focus:ring-2 transition-all"
              />
              <span className={`text-sm transition-colors ${showDense ? 'text-blue-700 font-medium' : 'text-gray-600'}`}>
                % of Density
              </span>
            </label>
          </div>
        </div>

        {/* Section Toggle Controls */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-center mb-3 text-gray-700">Toggle Mass Sections</h3>
          <div className="flex flex-wrap justify-center gap-2">
            {Object.keys(visibleSections).map((section) => {
              const sectionData = data.find(d => d.section === section);
              const isOrdinary = sectionData?.type === 'Ordinary';
              const isVisible = visibleSections[section as keyof VisibleSections];
              return (
                <button
                  key={section}
                  onClick={() => toggleSection(section as keyof VisibleSections)}
                  className={`px-3 py-1 rounded text-sm border-2 transition-all duration-200 transform flex items-center gap-1 ${
                    isVisible 
                      ? `bg-blue-500 text-white border-blue-500 shadow-md scale-105 ${isOrdinary ? 'ring-2 ring-blue-300' : ''}`
                      : `bg-gray-200 text-gray-600 border-gray-300 hover:bg-gray-300 hover:border-gray-400 hover:scale-102 active:scale-95 ${isOrdinary ? 'border-dashed' : ''}`
                  }`}
                  style={{
                    backgroundColor: isVisible ? '#3B82F6' : '#E5E7EB',
                    color: isVisible ? '#FFFFFF' : '#4B5563',
                    border: isVisible ? '2px solid #3B82F6' : '2px solid #D1D5DB',
                    fontFamily: 'inherit',
                    fontSize: '14px',
                    fontWeight: '500'
                  }}
                  title={isOrdinary ? 'Mass Ordinary' : 'Mass Proper'}
                >
                  <span className={`inline-block rounded-sm border flex items-center justify-center ${
                    isVisible 
                      ? 'bg-white border-white' 
                      : 'bg-transparent border-gray-400'
                  }`} style={{ 
                    width: '10px', 
                    height: '10px', 
                    minWidth: '10px', 
                    minHeight: '10px',
                    flexShrink: 0
                  }}>
                    {isVisible && (
                      <svg 
                        style={{ width: '6px', height: '6px' }}
                        className="text-blue-500" 
                        fill="currentColor" 
                        viewBox="0 0 20 20"
                      >
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    )}
                  </span>
                  {section} {isOrdinary ? '(O)' : '(P)'}
                </button>
              );
            })}
          </div>
          <div className="text-center mt-2">
            <button
              onClick={() => setVisibleSections(prev => {
                const allVisible = Object.values(prev).every(v => v);
                const newState = Object.keys(prev).reduce((acc, key) => {
                  acc[key as keyof typeof prev] = !allVisible;
                  return acc;
                }, {} as typeof prev);
                return newState;
              })}
              className="text-sm text-blue-600 hover:text-blue-800 hover:underline transition-all duration-200 px-2 py-1 rounded hover:bg-blue-50 active:scale-95"
            >
              {Object.values(visibleSections).every(v => v) ? 'Hide All' : 'Show All'}
            </button>
          </div>
          <div className="text-center mt-2 text-xs text-gray-500">
            <p>(O) = Mass Ordinary • (P) = Mass Proper</p>
          </div>
        </div>

        {/* Chart */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <ResponsiveContainer width="100%" height={500}>
            {chartType === 'line' ? (
              <LineChart data={getFilteredData()} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="section" 
                  tick={{ fontSize: 12 }}
                  angle={-45}
                  textAnchor="end"
                  height={80}
                />
                <YAxis 
                  label={{ value: 'Percentage (%)', angle: -90, position: 'insideLeft' }}
                  domain={[0, 100]}
                />
                <Tooltip content={<CustomTooltip />} />
                <Legend 
  wrapperStyle={{ paddingTop: '20px' }}
  iconType="line"
  iconSize={24}
  formatter={(value) => value}
  content={(props) => {
    if (!props.payload) return null;

    // Group composers and their Completeness/Density pairs
    const composers = ['Richafort', 'Prioris', 'Brumel', 'Fevin'];
    const groupedData = composers.map(composer => {
      const completeness = props.payload.find(item => 
        item.value.includes(composer) && item.value.includes('Completeness')
      );
      const density = props.payload.find(item => 
        item.value.includes(composer) && item.value.includes('Density')
      );
      return { composer, completeness, density };
    }).filter(group => group.completeness || group.density);

    return (
      <div className="grid gap-x-6 gap-y-1 text-sm justify-start" style={{ 
        gridTemplateColumns: `repeat(${groupedData.length}, auto)`,
        justifyContent: 'start',
        marginLeft: '20px'
      }}>
        {/* Loop through each composer group and render completeness and density */}
        {groupedData.map((group, index) => (
          <div key={index} className="flex flex-col items-start gap-1">
            {/* Completeness */}
            {group.completeness && (
              <div className="flex items-center gap-2">
                <svg width="24" height="8" className="flex-shrink-0">
                  <line
                    x1="0"
                    y1="4"
                    x2="24"
                    y2="4"
                    stroke={group.completeness.color}
                    strokeWidth="2"
                  />
                  <circle
                    cx="12"
                    cy="4"
                    r="3"
                    fill={group.completeness.color}
                  />
                </svg>
                <span style={{ color: group.completeness.color }}>
                  {group.completeness.value}
                </span>
              </div>
            )}
            {/* Density */}
            {group.density && (
              <div className="flex items-center gap-2">
                <svg width="24" height="8" className="flex-shrink-0">
                  <line
                    x1="0"
                    y1="4"
                    x2="24"
                    y2="4"
                    stroke={group.density.color}
                    strokeWidth="2"
                    strokeDasharray="4 2"
                  />
                </svg>
                <span style={{ color: group.density.color }}>
                  {group.density.value}
                </span>
              </div>
            )}
          </div>
        ))}
      </div>
    );
  }}
/>
                
                {getVisibleLines().map((lineKey) => (
                  <Line
                    key={lineKey}
                    type="monotone"
                    dataKey={lineKey}
                    stroke={colors[lineKey]}
                    strokeWidth={2}
                    strokeDasharray={lineKey.includes('% of Density') ? "8 4" : "0"}
                    dot={{ r: 4 }}
                    connectNulls={false}
                  />
                ))}
              </LineChart>
            ) : (
              <BarChart data={getFilteredData()} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="section" 
                  tick={{ fontSize: 12 }}
                  angle={-45}
                  textAnchor="end"
                  height={80}
                />
                <YAxis 
                  label={{ value: 'Percentage (%)', angle: -90, position: 'insideLeft' }}
                  domain={[0, 100]}
                />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                
                {getVisibleLines().map((barKey) => (
                  <Bar
                    key={barKey}
                    dataKey={barKey}
                    fill={colors[barKey]}
                    opacity={barKey.includes('% of Density') ? 0.7 : 0.9}
                  />
                ))}
              </BarChart>
            )}
          </ResponsiveContainer>
        </div>

        {/* Data Summary Table */}
        <div className="mt-8 bg-white p-6 rounded-lg shadow-lg overflow-x-auto">
          <h2 className="text-xl font-bold mb-4 text-gray-800">Data Summary</h2>
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="text-left p-2">Mass Section</th>
                <th className="text-center p-2" style={{ color: colors['Richafort % of Completeness'] }}>Richafort<br/>% of Completeness</th>
                <th className="text-center p-2" style={{ color: colors['Richafort % of Density'] }}>Richafort<br/>% of Density</th>
                <th className="text-center p-2" style={{ color: colors['Prioris % of Completeness'] }}>Prioris<br/>% of Completeness</th>
                <th className="text-center p-2" style={{ color: colors['Prioris % of Density'] }}>Prioris<br/>% of Density</th>
                <th className="text-center p-2" style={{ color: colors['Brumel % of Completeness'] }}>Brumel<br/>% of Completeness</th>
                <th className="text-center p-2" style={{ color: colors['Brumel % of Density'] }}>Brumel<br/>% of Density</th>
                <th className="text-center p-2" style={{ color: colors['Fevin % of Completeness'] }}>Fevin<br/>% of Completeness</th>
                <th className="text-center p-2" style={{ color: colors['Fevin % of Density'] }}>Fevin<br/>% of Density</th>
              </tr>
            </thead>
            <tbody>
              {getFilteredData().map((row, index) => (
                <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                  <td className="p-2 font-semibold">
                    {row.section} 
                    <span className="text-xs text-gray-500 ml-1">
                      ({row.type === 'Ordinary' ? 'O' : 'P'})
                    </span>
                  </td>
                  <td className="p-2 text-center">{row['Richafort % of Completeness']?.toFixed(2) || 'N/A'}</td>
                  <td className="p-2 text-center">{row['Richafort % of Density']?.toFixed(2) || 'N/A'}</td>
                  <td className="p-2 text-center">{row['Prioris % of Completeness']?.toFixed(2) || 'N/A'}</td>
                  <td className="p-2 text-center">{row['Prioris % of Density']?.toFixed(2) || 'N/A'}</td>
                  <td className="p-2 text-center">{row['Brumel % of Completeness']?.toFixed(2) || 'N/A'}</td>
                  <td className="p-2 text-center">{row['Brumel % of Density']?.toFixed(2) || 'N/A'}</td>
                  <td className="p-2 text-center">{row['Fevin % of Completeness']?.toFixed(2) || 'N/A'}</td>
                  <td className="p-2 text-center">{row['Fevin % of Density']?.toFixed(2) || 'N/A'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-4 text-sm text-gray-600">
          <p><strong>Note:</strong> "N/A" indicates missing data in the original dataset.</p>
          <p><strong>Visual Cues:</strong> Density lines are shown with dashed patterns. Mass Ordinary sections marked with (O), Mass Proper with (P).</p>
          <p><strong>Data Source:</strong> Requiem Spreadsheet analysis of Renaissance mass compositions - Updated Numbers 2</p>
        </div>
      </div>
    </div>
  );
};

export default MassAnalysisChart;