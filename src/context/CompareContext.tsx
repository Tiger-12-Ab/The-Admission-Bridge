import { createContext, useContext, useState } from "react";

const CompareContext = createContext<any>(null);

export const CompareProvider = ({ children }: any) => {
  const [compareCourses, setCompareCourses] = useState<any[]>([]);

  const addToCompare = (course: any) => {
    if (compareCourses.find(c => c.id === course.id)) return;
    if (compareCourses.length >= 3) return;

    setCompareCourses([...compareCourses, course]);
  };

  const removeFromCompare = (id: number) => {
    setCompareCourses(compareCourses.filter(c => c.id !== id));
  };

  const clearCompare = () => setCompareCourses([]);

  return (
    <CompareContext.Provider
      value={{ compareCourses, addToCompare, removeFromCompare, clearCompare }}
    >
      {children}
    </CompareContext.Provider>
  );
};

export const useCompare = () => useContext(CompareContext);
