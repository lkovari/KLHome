import { IBarChart } from './bar-chart-item.interface';

export class BarChartItem implements IBarChart {
    label: string;
    value: number;
    color: string;
}
