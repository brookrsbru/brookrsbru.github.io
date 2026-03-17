/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useCallback, useEffect } from 'react';
import { FixedSizeGrid } from 'react-window';
import { getColumnName } from './utils';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { Plus, Copy, Trash2, ChevronRight, ChevronDown } from 'lucide-react';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const COLUMN_COUNT = 18278; // A to ZZZ
const ROW_COUNT = 999;
const COLUMN_WIDTH = 100;
const ROW_HEIGHT = 30;

interface PresetButton {
  label: string;
  add: string;
}

const PRESET_BUTTONS: PresetButton[] = [
  { label: '¶', add: '&char(10)&' },
  { label: '¶<br>¶', add: '&char(10)&"<br>"&char(10)&' },
  { label: '<p>¶Dimension(s):¶<br>¶', add: '"<p>"&char(10)&"<strong>Dimension(s):</strong>"&char(10)&"<br>"&char(10)&' },
  { label: '<br><br>¶Load Rating(s):¶<br>¶', add: '&char(10)&"<br><br>"&char(10)&"<strong>Load Rating(s):</strong>"&char(10)&"<br>"&char(10)&' },
  { label: '_(', add: '&" ("&' },
  { label: ')_=_', add: '&") = "&' },
  { label: 'IFERROR', add: 'IFERROR(' },
  { label: 'VLOOKUP', add: 'VLOOKUP(' },
  { label: 'CONCATENATE', add: 'CONCATENATE(' },
  { label: 'TEXTJOIN', add: 'TEXTJOIN(", ", TRUE, ' },
  { label: 'SUBSTITUTE', add: 'SUBSTITUTE(' },
  { label: 'TRIM', add: 'TRIM(' },
];

export default function App() {
  const [formula, setFormula] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [gridSize, setGridSize] = useState({ width: 0, height: 0 });
  const gridContainerRef = useRef<HTMLDivElement>(null);
  const [hoveredCell, setHoveredCell] = useState<{ r: number; c: number } | null>(null);

  if (!FixedSizeGrid) {
    return (
      <div className="flex items-center justify-center h-screen bg-zinc-50">
        <div className="p-8 bg-white border border-zinc-200 rounded-2xl shadow-xl max-w-md text-center">
          <h1 className="text-xl font-bold text-red-600 mb-4">Component Load Error</h1>
          <p className="text-zinc-600 mb-6">
            The grid component could not be loaded. This might be due to a dependency resolution issue.
          </p>
          <button 
            onClick={() => window.location.reload()}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Reload Page
          </button>
        </div>
      </div>
    );
  }

  // Update grid size on resize
  useEffect(() => {
    const updateSize = () => {
      if (gridContainerRef.current) {
        setGridSize({
          width: gridContainerRef.current.clientWidth,
          height: gridContainerRef.current.clientHeight,
        });
      }
    };

    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  const insertAtCursor = useCallback((text: string) => {
    if (!textareaRef.current) return;

    const start = textareaRef.current.selectionStart;
    const end = textareaRef.current.selectionEnd;
    const currentFormula = formula;
    const newFormula =
      currentFormula.substring(0, start) +
      text +
      currentFormula.substring(end);
    
    setFormula(newFormula);

    // Set cursor position after insertion in next tick
    setTimeout(() => {
      if (textareaRef.current) {
        const newPos = start + text.length;
        textareaRef.current.focus();
        textareaRef.current.setSelectionRange(newPos, newPos);
      }
    }, 0);
  }, [formula]);

  const handleCellClick = (rowIndex: number, columnIndex: number) => {
    const cellRef = `${getColumnName(columnIndex)}${rowIndex + 1}`;
    insertAtCursor(cellRef);
  };

  const Cell = ({ columnIndex, rowIndex, style }: any) => {
    // Header row
    if (rowIndex === -1) {
      return (
        <div
          style={style}
          className="bg-zinc-100 border-r border-b border-zinc-300 flex items-center justify-center font-medium text-xs text-zinc-600 select-none"
        >
          {getColumnName(columnIndex)}
        </div>
      );
    }

    // Header column
    if (columnIndex === -1) {
      return (
        <div
          style={style}
          className="bg-zinc-100 border-r border-b border-zinc-300 flex items-center justify-center font-medium text-xs text-zinc-600 select-none"
        >
          {rowIndex + 1}
        </div>
      );
    }

    return (
      <div
        style={style}
        onClick={() => handleCellClick(rowIndex, columnIndex)}
        className="border-r border-b border-zinc-200 flex items-center px-2 text-sm hover:bg-blue-50 cursor-pointer transition-colors select-none"
      >
        {/* Empty cell content like Excel */}
      </div>
    );
  };

  const mainGridRef = useRef<any>(null);
  const headerGridRef = useRef<any>(null);
  const rowGridRef = useRef<any>(null);

  const onScroll = useCallback(({ scrollLeft, scrollTop }: { scrollLeft: number; scrollTop: number }) => {
    headerGridRef.current?.scrollTo({ scrollLeft });
    rowGridRef.current?.scrollTo({ scrollTop });
  }, []);

  return (
    <div className="flex h-screen w-full bg-white overflow-hidden font-sans text-zinc-900">
      {/* Left Section: Grid */}
      <div ref={gridContainerRef} className="flex-1 h-full border-r border-zinc-300 relative bg-zinc-50">
        {gridSize.width > 0 && (
          <div className="absolute inset-0">
            {/* Top-left corner */}
            <div className="absolute top-0 left-0 w-[40px] h-[30px] bg-zinc-100 border-r border-b border-zinc-300 z-20" />
            
            {/* Column Headers */}
            <div className="absolute top-0 left-[40px] right-0 h-[30px] z-10 overflow-hidden">
              <FixedSizeGrid
                ref={headerGridRef}
                columnCount={COLUMN_COUNT}
                columnWidth={COLUMN_WIDTH}
                height={30}
                rowCount={1}
                rowHeight={30}
                width={gridSize.width - 40}
                style={{ overflow: 'hidden' }}
              >
                {({ columnIndex, style }) => (
                  <div
                    style={style}
                    className={cn(
                      "bg-zinc-100 border-r border-b border-zinc-300 flex items-center justify-center font-medium text-xs text-zinc-600 select-none transition-colors",
                      hoveredCell?.c === columnIndex && "bg-blue-100 text-blue-700 font-bold"
                    )}
                  >
                    {getColumnName(columnIndex)}
                  </div>
                )}
              </FixedSizeGrid>
            </div>

            {/* Row Headers */}
            <div className="absolute top-[30px] left-0 bottom-0 w-[40px] z-10 overflow-hidden">
              <FixedSizeGrid
                ref={rowGridRef}
                columnCount={1}
                columnWidth={40}
                height={gridSize.height - 30}
                rowCount={ROW_COUNT}
                rowHeight={ROW_HEIGHT}
                width={40}
                style={{ overflow: 'hidden' }}
              >
                {({ rowIndex, style }) => (
                  <div
                    style={style}
                    className={cn(
                      "bg-zinc-100 border-r border-b border-zinc-300 flex items-center justify-center font-medium text-xs text-zinc-600 select-none transition-colors",
                      hoveredCell?.r === rowIndex && "bg-blue-100 text-blue-700 font-bold"
                    )}
                  >
                    {rowIndex + 1}
                  </div>
                )}
              </FixedSizeGrid>
            </div>

            {/* Main Grid */}
            <div className="absolute top-[30px] left-[40px] right-0 bottom-0">
              <FixedSizeGrid
                ref={mainGridRef}
                columnCount={COLUMN_COUNT}
                columnWidth={COLUMN_WIDTH}
                height={gridSize.height - 30}
                rowCount={ROW_COUNT}
                rowHeight={ROW_HEIGHT}
                width={gridSize.width - 40}
                onScroll={onScroll}
              >
                {({ columnIndex, rowIndex, style }) => (
                  <div
                    style={style}
                    onClick={() => handleCellClick(rowIndex, columnIndex)}
                    onMouseEnter={() => setHoveredCell({ r: rowIndex, c: columnIndex })}
                    onMouseLeave={() => setHoveredCell(null)}
                    className={cn(
                      "border-r border-b border-zinc-200 flex items-center px-2 text-sm hover:bg-blue-50 cursor-pointer transition-colors select-none bg-white",
                      hoveredCell?.r === rowIndex && "bg-blue-50/30",
                      hoveredCell?.c === columnIndex && "bg-blue-50/30",
                      hoveredCell?.r === rowIndex && hoveredCell?.c === columnIndex && "bg-blue-100/50 ring-1 ring-inset ring-blue-400 z-10"
                    )}
                  >
                  </div>
                )}
              </FixedSizeGrid>
            </div>
          </div>
        )}
      </div>

      {/* Right Section: Editor */}
      <div className="w-[450px] h-full flex flex-col border-l border-zinc-300 bg-zinc-50">
        {/* Top Panel: Formula Box */}
        <div className="flex-1 p-6 flex flex-col min-h-0">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-zinc-500">Formula Editor</h2>
            <div className="flex gap-2">
              <button 
                onClick={() => setFormula('')}
                className="p-1.5 text-zinc-400 hover:text-red-500 hover:bg-red-50 rounded-md transition-colors"
                title="Clear Formula"
              >
                <Trash2 size={16} />
              </button>
              <button 
                onClick={() => navigator.clipboard.writeText(formula)}
                className="p-1.5 text-zinc-400 hover:text-blue-500 hover:bg-blue-50 rounded-md transition-colors"
                title="Copy to Clipboard"
              >
                <Copy size={16} />
              </button>
            </div>
          </div>
          <div className="flex-1 relative group">
            <textarea
              ref={textareaRef}
              value={formula}
              onChange={(e) => setFormula(e.target.value)}
              placeholder="Select cells or use buttons to build your formula..."
              className="w-full h-full p-4 bg-white border border-zinc-200 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none resize-none font-mono text-sm leading-relaxed transition-all"
            />
          </div>
        </div>

        {/* Bottom Panel: Preset Buttons */}
        <div className="h-[320px] border-t border-zinc-200 bg-white overflow-y-auto custom-scrollbar relative">
          <div className="sticky top-0 bg-white z-10 px-6 pt-6 pb-4">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-zinc-500">Presets</h2>
          </div>
          <div className="px-6 pb-6">
            <div className="grid grid-cols-2 gap-3">
              {PRESET_BUTTONS.map((btn, idx) => (
                <button
                  key={idx}
                  onClick={() => insertAtCursor(btn.add)}
                  className="flex flex-col items-start p-3 bg-zinc-50 border border-zinc-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 hover:shadow-sm transition-all text-left group"
                >
                  <span className="text-xs font-mono text-zinc-400 mb-1 group-hover:text-blue-400">Label:</span>
                  <span className="text-sm font-medium text-zinc-700 break-all leading-tight">
                    {btn.label.split('¶').map((part, i, arr) => (
                      <React.Fragment key={i}>
                        {part}
                        {i < arr.length - 1 && <span className="text-blue-500 font-bold mx-0.5">¶</span>}
                      </React.Fragment>
                    ))}
                  </span>
                  <div className="mt-2 text-[10px] text-zinc-400 font-mono truncate w-full">
                    {btn.add}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
