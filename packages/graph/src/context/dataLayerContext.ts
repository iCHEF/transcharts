import { createContext } from 'react';

export interface DataLayerContextInferface {
  activeDataIndex: number | null;
  setActiveDataIndex: (activeDataIndex: number) => void;
}

export default createContext<DataLayerContextInferface | null>(null);
