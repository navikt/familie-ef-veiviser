import moment from 'moment';
import 'moment/min/locales';
import 'moment/locale/nb';
moment.locale('nb');

export const STANDARD_DATOFORMAT = 'DD.MM.YYYY';
export const GYLDIGE_DATOFORMAT = ['DD.MM.YYYY', 'DDMMYYYY', 'DD.MM.YY', 'DDMMYY'];

export const formatDate = (date: Date, locale: string = 'nb') => {
    const format = STANDARD_DATOFORMAT;

    return moment(date)
        .locale(locale)
        .format(Array.isArray(format) ? format[0] : format);
};

export const parseDate = (str: string, format: string = 'DD.MM.YYYY', locale: string = 'nb') => {
    const m = moment(str, GYLDIGE_DATOFORMAT, locale, true);

    if (m.isValid()) {
        return m.toDate();
    }

    return undefined;
};
