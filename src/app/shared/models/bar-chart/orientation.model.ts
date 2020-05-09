import { SelectItem } from 'primeng';
import { BarChartOrientation } from './bar-chart-orientation.enum';

export class Orientation implements SelectItem {
    value: number;
    label: string;
    orientation: BarChartOrientation;
}