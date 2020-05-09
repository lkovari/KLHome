import { IBarChart } from './bar-chart-item.interface';

export class BarChartItem implements IBarChart {
    id: number;
    label: string;
    value: number;
    color: string;
}
