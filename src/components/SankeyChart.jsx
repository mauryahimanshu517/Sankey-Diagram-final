import React, { useEffect, useRef } from 'react';
import { Chart, registerables } from 'chart.js';
import { SankeyController, Flow } from 'chartjs-chart-sankey';
import { useSelector } from 'react-redux';

// Register chart components (do this once)
Chart.register(...registerables, SankeyController, Flow);

const SankeyChart = () => {
  const chartRef = useRef(null);
  const canvasRef = useRef(null);

  // Select nodes and links from Redux store
  const { nodes, links } = useSelector((state) => state.data);

  useEffect(() => {
    if (!canvasRef.current) return;

    // Cleanup existing chart if present
    if (chartRef.current) {
      chartRef.current.destroy();
    }

    const ctx = canvasRef.current.getContext('2d');

    // Transform links for Sankey chart
    const sankeyData = links.map((link) => ({
      from: link.source,
      to: link.target,
      flow: link.value,
    }));

    // Create the chart
    chartRef.current = new Chart(ctx, {
      type: 'sankey',
      data: {
        datasets: [
          {
            label: 'Income vs Expenditure',
            data: sankeyData,
            colorFrom: 'blue',
            colorTo: 'green',
            labels: nodes.map((node) => node.id),
            borderWidth: 1,
            borderColor: 'gray',
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          tooltip: {
            callbacks: {
              label: function (context) {
                const link = context.raw;
                return `${link.from} → ${link.to}: ₹${link.flow}`;
              },
            },
          },
        },
      },
    });

    // Cleanup on component unmount
    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
      }
    };
  }, [nodes, links]);

  return (
    <div style={{ height: '500px', width: '100%' }}>
      <canvas ref={canvasRef} data-testid="sankey-canvas" />
    </div>
  );
};

export default SankeyChart;
