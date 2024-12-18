import {
  Component,
  type ComponentType,
  type GetDerivedStateFromError,
  type PropsWithChildren,
} from 'react';

/**
 * Компонент для обработки ошибок в приложении
 * Перехватывает ошибки рендеринга и отображает fallback компонент
 */
export interface ErrorBoundaryProps extends PropsWithChildren {
  // Компонент для отображения при ошибке
  fallback: ComponentType<{ error: Error }>;
}

interface ErrorBoundaryState {
  error?: Error;
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = {};

  // Обновляем состояние при возникновении ошибки
  static getDerivedStateFromError: GetDerivedStateFromError<ErrorBoundaryProps, ErrorBoundaryState> = (error) => ({ error });

  // Логируем ошибку
  componentDidCatch(error: Error) {
    this.setState({ error });
  }

  render() {
    const {
      state: {
        error,
      },
      props: {
        fallback: Fallback,
        children,
      },
    } = this;

    // Если есть ошибка - показываем fallback, иначе рендерим детей
    return error ? <Fallback error={error}/> : children;
  }
}