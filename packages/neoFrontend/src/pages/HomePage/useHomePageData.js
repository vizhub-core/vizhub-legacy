import { usePageData } from '../../VizzesGrid/usePageData';
import { fetchHomePageData } from './fetchHomePageData';

export const useHomePageData = () => usePageData(fetchHomePageData);
