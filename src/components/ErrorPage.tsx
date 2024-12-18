import { useEffect } from 'react';

/**
 * Страница отображения ошибки
 * Показывает сообщение об ошибке и кнопку для повторной попытки
 */
export function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset?: () => void
}) {
  // Логируем ошибку при монтировании компонента
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div>
      <h2>Произошла непредвиденная ошибка!</h2>
      <blockquote>
        <code>
          {error.message}
        </code>
      </blockquote>
      {/* Кнопка для повторной попытки, если доступна */}
      {reset && <button onClick={() => reset()}>Попробовать снова</button>}
    </div>
  );
}