import { useState, useEffect } from 'react';

const INITIAL_DATA = {
  A1: 'Monthly Sales', B1: 'Revenue ($)', C1: 'Ad Spend ($)', D1: 'Net Profit ($)', E1: 'Margin (%)',
  A2: 'Week 1', B2: '12400', C2: '3200', D2: '=B2-C2', E2: '74%',
  A3: 'Week 2', B3: '14800', C3: '4100', D3: '=B3-C3', E3: '72%',
  A4: 'Week 3', B4: '19200', C4: '4500', D4: '=B4-C4', E4: '76%',
  A5: 'Week 4', B5: '22100', C5: '5200', D5: '=B5-C5', E5: '76%',
  A6: 'Total Sum', B6: '=SUM(B2:B5)', C6: '=SUM(C2:C5)', D6: '=SUM(D2:D5)', E6: '75%',
};

export default function SheetFlowModal({ isOpen, onClose }) {
  const [data, setData] = useState(() => {
    try {
      const saved = localStorage.getItem('sheetflow_offline_data');
      return saved ? JSON.parse(saved) : INITIAL_DATA;
    } catch {
      return INITIAL_DATA;
    }
  });

  const [activeCell, setActiveCell] = useState('B2');

  useEffect(() => {
    try {
      localStorage.setItem('sheetflow_offline_data', JSON.stringify(data));
    } catch {
      // localStorage may fail in some environments
    }
  }, [data]);

  if (!isOpen) return null;

  const evaluateFormula = (val) => {
    if (!val || typeof val !== 'string') return val || '';
    if (!val.startsWith('=')) return val;

    try {
      const expr = val.slice(1).trim().toUpperCase();
      
      // SUM(X1:X4)
      if (expr.startsWith('SUM(') && expr.endsWith(')')) {
        const range = expr.slice(4, -1);
        const [start, end] = range.split(':');
        if (start && end) {
          const col = start[0];
          const r1 = parseInt(start.slice(1), 10);
          const r2 = parseInt(end.slice(1), 10);
          let sum = 0;
          for (let r = Math.min(r1, r2); r <= Math.max(r1, r2); r++) {
            const raw = data[`${col}${r}`] || '0';
            const num = parseFloat(evaluateFormula(raw)) || 0;
            sum += num;
          }
          return sum.toLocaleString();
        }
      }

      // Simple B2-C2 or B2+C2
      if (expr.includes('-')) {
        const [c1, c2] = expr.split('-');
        const v1 = parseFloat(evaluateFormula(data[c1.trim()] || '0')) || 0;
        const v2 = parseFloat(evaluateFormula(data[c2.trim()] || '0')) || 0;
        return (v1 - v2).toLocaleString();
      }

      if (expr.includes('+')) {
        const [c1, c2] = expr.split('+');
        const v1 = parseFloat(evaluateFormula(data[c1.trim()] || '0')) || 0;
        const v2 = parseFloat(evaluateFormula(data[c2.trim()] || '0')) || 0;
        return (v1 + v2).toLocaleString();
      }

      return val;
    } catch {
      return '#ERROR';
    }
  };

  const handleCellChange = (cellId, value) => {
    setData((prev) => ({ ...prev, [cellId]: value }));
  };

  const exportCsv = () => {
    const rows = [1, 2, 3, 4, 5, 6, 7, 8];
    const cols = ['A', 'B', 'C', 'D', 'E'];
    const csvContent = rows
      .map((r) => cols.map((c) => `"${evaluateFormula(data[`${c}${r}`]) || ''}"`).join(','))
      .join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'belintan_sheetflow_export.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const resetSheet = () => {
    setData(INITIAL_DATA);
    localStorage.removeItem('sheetflow_offline_data');
  };

  const columns = ['A', 'B', 'C', 'D', 'E'];
  const rows = [1, 2, 3, 4, 5, 6, 7, 8];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl bg-[#0c0d14] border border-white/15 rounded-3xl shadow-[0_25px_70px_rgba(0,0,0,0.9)] overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Header Strip */}
        <div className="px-5 py-3.5 bg-[#12131b] border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#10b981] flex items-center justify-center font-black text-black text-sm shadow-[0_0_12px_rgba(16,185,129,0.5)]">
              S
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-white font-extrabold text-sm tracking-tight">SheetFlow: Offline Spreadsheet</span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-[#10b981]/20 text-[#10b981] border border-[#10b981]/30">
                  LOCAL-FIRST PWA
                </span>
              </div>
              <p className="text-[10px] text-[#9d978a] font-mono">Google Sheets clone with instant offline formula engine</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={exportCsv}
              className="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white text-xs font-semibold transition-colors flex items-center gap-1.5"
            >
              <span>⬇️ CSV</span>
            </button>
            <button
              onClick={resetSheet}
              className="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white text-xs font-semibold transition-colors"
            >
              Reset
            </button>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 flex items-center justify-center text-[#9d978a] hover:text-white transition-colors"
              aria-label="Close dialog"
            >
              &times;
            </button>
          </div>
        </div>

        {/* Formula Bar */}
        <div className="px-5 py-2.5 bg-[#0e0f17] border-b border-white/5 flex items-center gap-3">
          <div className="px-2.5 py-1 rounded-lg bg-black border border-white/10 text-xs font-mono text-[#ff913d] font-bold">
            {activeCell}
          </div>
          <span className="text-xs font-mono text-[#9d978a] font-bold">fx</span>
          <input
            type="text"
            value={data[activeCell] || ''}
            onChange={(e) => handleCellChange(activeCell, e.target.value)}
            placeholder="Enter value or formula like =SUM(B2:B5) or =B2-C2..."
            className="flex-1 px-3 py-1 rounded-lg bg-black border border-white/10 text-white font-mono text-xs focus:outline-none focus:border-[#10b981]"
          />
        </div>

        {/* Spreadsheet Grid (Touch-friendly & Horizontally Scrollable) */}
        <div className="flex-1 overflow-auto bg-[#08090d] p-3">
          <table className="w-full border-collapse font-mono text-xs">
            <thead>
              <tr>
                <th className="w-12 p-2 bg-[#12131b] border border-white/10 text-[#9d978a] text-[10px]">#</th>
                {columns.map((c) => (
                  <th key={c} className="p-2 bg-[#12131b] border border-white/10 text-[#dcd7ce] font-bold min-w-[120px]">
                    {c}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r}>
                  <td className="p-2 bg-[#0e0f17] border border-white/10 text-center text-[#9d978a] font-bold">
                    {r}
                  </td>
                  {columns.map((c) => {
                    const cellKey = `${c}${r}`;
                    const rawVal = data[cellKey] || '';
                    const evalVal = evaluateFormula(rawVal);
                    const isSelected = activeCell === cellKey;
                    const isHeader = r === 1 || c === 'A';

                    return (
                      <td
                        key={cellKey}
                        onClick={() => setActiveCell(cellKey)}
                        className={`p-1 border border-white/10 transition-colors ${
                          isSelected ? 'bg-[#10b981]/20 ring-2 ring-[#10b981]' : 'hover:bg-white/5'
                        }`}
                      >
                        <input
                          type="text"
                          value={isSelected ? rawVal : evalVal}
                          onChange={(e) => handleCellChange(cellKey, e.target.value)}
                          className={`w-full px-2 py-1.5 bg-transparent border-0 text-xs focus:outline-none ${
                            isHeader ? 'font-bold text-white' : 'text-[#dcd7ce]'
                          }`}
                        />
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer Info */}
        <div className="px-5 py-3 bg-[#12131b] border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-[#9d978a]">
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#10b981]"></span>
            IndexedDB / LocalStorage Sync: Active
          </span>
          <span>100% Offline Capable • Zero Latency</span>
        </div>

      </div>
    </div>
  );
}