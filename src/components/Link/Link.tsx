import { openLink, classNames } from '@telegram-apps/sdk-react';
import { type FC, type MouseEventHandler, type JSX, useCallback } from 'react';
import { type LinkProps as NextLinkProps, default as NextLink } from 'next/link';

import './styles.css';

/**
 * Компонент для создания ссылок
 * Поддерживает как внутренние, так и внешние ссылки
 * Внешние ссылки открываются через Telegram API
 */
export interface LinkProps extends NextLinkProps, Omit<JSX.IntrinsicElements['a'], 'href'> {
}

export const Link: FC<LinkProps> = ({
  className,
  onClick: propsOnClick,
  href,
  ...rest
}) => {
  const onClick = useCallback<MouseEventHandler<HTMLAnchorElement>>((e) => {
    propsOnClick?.(e);

    // Определяем, является ли ссылка внешней
    let path: string;
    if (typeof href === 'string') {
      path = href;
    } else {
      const { search = '', pathname = '', hash = '' } = href;
      path = `${pathname}?${search}#${hash}`;
    }

    const targetUrl = new URL(path, window.location.toString());
    const currentUrl = new URL(window.location.toString());
    const isExternal = targetUrl.protocol !== currentUrl.protocol
      || targetUrl.host !== currentUrl.host;

    // Если ссылка внешняя - открываем через Telegram API
    if (isExternal) {
      e.preventDefault();
      openLink(targetUrl.toString());
    }
  }, [href, propsOnClick]);

  return (
    <NextLink
      {...rest}
      href={href}
      onClick={onClick}
      className={classNames(className, 'link')}
    />
  );
};