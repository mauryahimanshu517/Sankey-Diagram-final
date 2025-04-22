// components/SankeyChart.tsx
import React from 'react';
import { ResponsiveSankey } from '@nivo/sankey';
import { useAppSelector } from '../hooks/useTypedHooks';
import { RootState } from '../store';

const SankeyChart: React.FC = () => {
    const { nodes, links } = useAppSelector((state: RootState) => state.sankey);

    return (
        <div style={{ height: 500 }}>
            <ResponsiveSankey
                data={{ nodes, links }}
                margin={{ top: 40, right: 160, bottom: 40, left: 50 }}
                align="justify"
                colors={{ scheme: 'category10' }}
                nodeOpacity={1}
                nodeThickness={18}
                nodeInnerPadding={3}
                nodeSpacing={24}
                nodeBorderWidth={1}
                nodeBorderColor={{ from: 'color', modifiers: [['darker', 0.8]] }}
                linkOpacity={0.5}
                linkHoverOpacity={0.8}
                linkContract={0}
                linkBlendMode="multiply"
                enableLinkGradient={true}
                labelPosition="outside"
                labelOrientation="horizontal"
                labelPadding={16}
                labelTextColor={{ from: 'color', modifiers: [['darker', 1]] }}
                legends={[]}
                tooltip={({ node }) => (
                    <div
                        style={{
                            padding: '5px 10px',
                            background: '#fff',
                            border: '1px solid #ccc',
                            borderRadius: '4px',
                        }}
                    >
                        <strong>{node.label}</strong>: {node.value}
                    </div>
                )}
            />
        </div>
    );
};

export default SankeyChart;