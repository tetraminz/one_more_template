import { useEffect, useState } from 'react';

/**
 * Хук, который возвращает true после первого рендера компонента
 * Используется для определения, выполняется ли код на клиенте
 * 
 * @returns boolean - true если компонент смонтирован
 */
export function useDidMount(): boolean {
  const [didMount, setDidMount] = useState(false);

  useEffect(() => {
    setDidMount(true);
  }, []);

  return didMount;
}