"use client";

import { ProductividadChart } from '../charts/ProductividadChart';
import { MetricCard }         from '../MetricCard';
import { productividadChartData, productividadMetrics } from '../../_data/reportsMockData';

export function TabProductividad() {
  return (
    <div className="space-y-6">
      {/* Line chart */}
      <ProductividadChart data={productividadChartData} metaValue={6} />

      {/* Summary cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {productividadMetrics.map((m, i) => (
          <MetricCard key={i} {...m} />
        ))}
      </div>
    </div>
  );
}
