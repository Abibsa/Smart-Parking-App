import { useParkingContext } from '../context/ParkingContext';
import { translations } from './translations';

export function useTranslation() {
    const { language } = useParkingContext();

    const t = (key) => {
        return translations[language]?.[key] || translations['id'][key] || key;
    };

    return { t, language };
}
