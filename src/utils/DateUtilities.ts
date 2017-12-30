export default class DateUtilities {

    public static dateDiff(date1: Date, date2: Date): string {
        let res = '';
        let years = 0;
        let months = 0;

        months = (date2.getFullYear() - date1.getFullYear()) * 12;
        months -= date1.getMonth() + 1;
        months += date2.getMonth();
        months = months <= 0 ? 0 : months;
        if (months > 12) {
            years = months % 12;
            months = (months - (years * 12));
        }
        res = '' + years + ' year ' + (years > 1 ? 's' : '') + months + ' month' + (months > 1 ? 's' : '');
        return res;
    }

}