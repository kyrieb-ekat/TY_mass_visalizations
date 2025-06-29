import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from 'recharts';
import type { TooltipProps } from 'recharts';

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

  // Data extracted from the CSV
  const data = [
    {
      section: 'Introit',
      position: 1,
      'Richafort % Complete': 46.09,
      'Richafort % Dense': 34.87,
      'Prioris % Complete': 83.48,
      'Prioris % Dense': 78.05,
      'Brumel % Complete': 84.35,
      'Brumel % Dense': 67.36,
      'Fevin % Complete': 78.26,
      'Fevin % Dense': 70.87
    },
    {
      section: 'Kyrie',
      position: 2,
      'Richafort % Complete': 17.28,
      'Richafort % Dense': null,
      'Prioris % Complete': 32.35,
      'Prioris % Dense': null,
      'Brumel % Complete': 38.97,
      'Brumel % Dense': 50.24,
      'Fevin % Complete': 24.26,
      'Fevin % Dense': 61.68
    },
    {
      section: 'Gradual',
      position: 3,
      'Richafort % Complete': 52.77,
      'Richafort % Dense': 40.92,
      'Prioris % Complete': 73.19,
      'Prioris % Dense': 64.91,
      'Brumel % Complete': null,
      'Brumel % Dense': null,
      'Fevin % Complete': 51.49,
      'Fevin % Dense': 42.76
    },
    {
      section: 'Offertory',
      position: 4,
      'Richafort % Complete': 53.85,
      'Richafort % Dense': 50.52,
      'Prioris % Complete': 69.78,
      'Prioris % Dense': 66.67,
      'Brumel % Complete': null,
      'Brumel % Dense': null,
      'Fevin % Complete': 54.67,
      'Fevin % Dense': 57.35
    },
    {
      section: 'Sanctus',
      position: 5,
      'Richafort % Complete': 88.33,
      'Richafort % Dense': 54.08,
      'Prioris % Complete': 85.00,
      'Prioris % Dense': 53.68,
      'Brumel % Complete': 80.00,
      'Brumel % Dense': 64.86,
      'Fevin % Complete': 93.33,
      'Fevin % Dense': 67.47
    },
    {
      section: 'Agnus Dei',
      position: 6,
      'Richafort % Complete': 64.62,
      'Richafort % Dense': 42.86,
      'Prioris % Complete': 67.69,
      'Prioris % Dense': 58.67,
      'Brumel % Complete': 60.00,
      'Brumel % Dense': 57.35,
      'Fevin % Complete': 67.69,
      'Fevin % Dense': 62.86
    },
    {
      section: 'Communion',
      position: 7,
      'Richafort % Complete': 91.78,
      'Richafort % Dense': 51.54,
      'Prioris % Complete': 91.78,
      'Prioris % Dense': 66.34,
      'Brumel % Complete': 93.15,
      'Brumel % Dense': 40.72,
      'Fevin % Complete': 89.04,
      'Fevin % Dense': 74.71
    }
  ];

  const colors = {
    'Richafort % Complete': '#8884d8',
    'Richafort % Dense': '#82ca9d',
    'Prioris % Complete': '#ffc658',
    'Prioris % Dense': '#ff7300',
    'Brumel % Complete': '#413ea0',
    'Brumel % Dense': '#ff8042',
    'Fevin % Complete': '#0088fe',
    'Fevin % Dense': '#00c49f'
  };

  const getFilteredData = () => {
    return data.filter(item => visibleSections[item.section]);
  };

  const toggleSection = (section) => {
    setVisibleSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const getVisibleLines = (): string[] => {
    const lines: string[] = [];
    if (showComplete) {
      lines.push('Richafort % Complete', 'Prioris % Complete', 'Brumel % Complete', 'Fevin % Complete');
    }
    if (showDense) {
      lines.push('Richafort % Dense', 'Prioris % Dense', 'Brumel % Dense', 'Fevin % Dense');
    }
    return lines;
  };
  // (moved import to top)

  const CustomTooltip = (props: any) => {
    const { active, payload, label } = props;
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-gray-300 rounded shadow-lg">
          <p className="font-semibold">{`${label}`}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} style={{ color: entry.color }}>
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
        <h1 className="text-3xl font-bold text-center mb-2 text-gray-800">
          Mass Analysis Comparison
        </h1>
        <p className="text-center text-gray-600 mb-6">
          Comparing % Complete and % Dense across four Renaissance masses
        </p>

        {/* Controls */}
        <div className="flex flex-wrap justify-center gap-4 mb-6">
          <div className="flex gap-2">
            <button
              onClick={() => setChartType('line')}
              className={`px-4 py-2 rounded ${chartType === 'line' ? 'bg-blue-500 text-white' : 'bg-white text-gray-700 border'}`}
            >
              Line Chart
            </button>
            <button
              onClick={() => setChartType('bar')}
              className={`px-4 py-2 rounded ${chartType === 'bar' ? 'bg-blue-500 text-white' : 'bg-white text-gray-700 border'}`}
            >
              Bar Chart
            </button>
          </div>
          
          <div className="flex gap-2">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={showComplete}
                onChange={(e) => setShowComplete(e.target.checked)}
                className="rounded"
              />
              <span className="text-sm">% Complete</span>
            </label>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={showDense}
                onChange={(e) => setShowDense(e.target.checked)}
                className="rounded"
              />
              <span className="text-sm">% Dense</span>
            </label>
          </div>
        </div>

        {/* Section Toggle Controls */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-center mb-3 text-gray-700">Toggle Mass Sections</h3>
          <div className="flex flex-wrap justify-center gap-2">
            {Object.keys(visibleSections).map((section) => (
              <button
                key={section}
                onClick={() => toggleSection(section)}
                className={`px-3 py-1 rounded text-sm ${
                  visibleSections[section] 
                    ? 'bg-green-500 text-white' 
                    : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                }`}
              >
                {section}
              </button>
            ))}
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
              className="text-sm text-blue-600 hover:text-blue-800"
            >
              {Object.values(visibleSections).every(v => v) ? 'Hide All' : 'Show All'}
            </button>
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
                <Legend />
                
                {getVisibleLines().map((lineKey) => (
                  <Line
                    key={lineKey}
                    type="monotone"
                    dataKey={lineKey}
                    stroke={colors[lineKey]}
                    strokeWidth={2}
                    strokeDasharray={lineKey.includes('Brumel') ? "5 5" : "0"}
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
                    opacity={barKey.includes('Brumel') ? 0.6 : 0.8}
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
                <th className="text-center p-2 text-purple-600">Richafort<br/>% Complete</th>
                <th className="text-center p-2 text-green-600">Richafort<br/>% Dense</th>
                <th className="text-center p-2 text-yellow-600">Prioris<br/>% Complete</th>
                <th className="text-center p-2 text-orange-600">Prioris<br/>% Dense</th>
                <th className="text-center p-2 text-indigo-600">Brumel<br/>% Complete</th>
                <th className="text-center p-2 text-red-600">Brumel<br/>% Dense</th>
                <th className="text-center p-2 text-blue-600">Fevin<br/>% Complete</th>
                <th className="text-center p-2 text-teal-600">Fevin<br/>% Dense</th>
              </tr>
            </thead>
            <tbody>
              {getFilteredData().map((row, index) => (
                <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                  <td className="p-2 font-semibold">{row.section}</td>
                  <td className="p-2 text-center">{row['Richafort % Complete']?.toFixed(2) || 'N/A'}</td>
                  <td className="p-2 text-center">{row['Richafort % Dense']?.toFixed(2) || 'N/A'}</td>
                  <td className="p-2 text-center">{row['Prioris % Complete']?.toFixed(2) || 'N/A'}</td>
                  <td className="p-2 text-center">{row['Prioris % Dense']?.toFixed(2) || 'N/A'}</td>
                  <td className="p-2 text-center">{row['Brumel % Complete']?.toFixed(2) || 'N/A'}</td>
                  <td className="p-2 text-center">{row['Brumel % Dense']?.toFixed(2) || 'N/A'}</td>
                  <td className="p-2 text-center">{row['Fevin % Complete']?.toFixed(2) || 'N/A'}</td>
                  <td className="p-2 text-center">{row['Fevin % Dense']?.toFixed(2) || 'N/A'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-4 text-sm text-gray-600">
          <p><strong>Note:</strong> "N/A" indicates missing data in the original dataset.</p>
          <p><strong>Visual Cues:</strong> Brumel's lines are shown with dashed patterns and reduced opacity to indicate incomplete data.</p>
          <p><strong>Data Source:</strong> Requiem Spreadsheet analysis of Renaissance mass compositions</p>
        </div>
      </div>
    </div>
  );
};

export default MassAnalysisChart;