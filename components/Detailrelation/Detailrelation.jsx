import { LoadingDots } from '@/components/LoadingDots';
import cljx from 'clsx';
import { forwardRef } from 'react';
import styles from './Contador.module.css';

export const DetailsRelation = forwardRef(function Contador(
  {
    children,
    type,
    className,
    onClick,
    size,
    variant = 'invert',
    loading,
    disabled,
  },
  ref
) {
  return (
    <td className={styles.count} rowSpan="3">
              <i className={cljx('fa fa-sort-asc', styles.voto)}></i>
              <p>Número contasssdor</p>
              <i className={cljx('fa fa-sort-desc', styles.voto)}></i>
        </td>
  );
});

export const ButtonLink = forwardRef(function Button(
  { children, type, className, href, onClick, size, variant = 'invert' },
  ref
) {
  return (
    <a
      className={clsx(
        styles.button,
        type && styles[type],
        size && styles[size],
        variant && styles[variant],
        className
      )}
      ref={ref}
      href={href}
      onClick={onClick}
    >
      <span>{children}</span>
    </a>
  );
});
