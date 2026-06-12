import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';

import { ShadcnButton, type ShadcnButtonProps } from '../../primitives/shadcn/button';
import { cn } from '../../utils/cn';

const buttonVariants = cva('', {
  variants: {
    variant: {
      default: '',
      secondary: '',
      outline: '',
      ghost: '',
      destructive: '',
      warning: 'bg-warning text-warning-foreground hover:bg-warning/90',
      success: 'bg-success text-success-foreground hover:bg-success/90',
      brand: 'bg-accent-foreground text-white hover:bg-accent-foreground/90',
    },
    size: {
      sm: '',
      md: '',
      lg: '',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'md',
  },
});

const sizeMap = {
  sm: 'sm',
  md: 'default',
  lg: 'lg',
} as const;

const variantMap = {
  default: 'default',
  secondary: 'secondary',
  outline: 'outline',
  ghost: 'ghost',
  destructive: 'destructive',
  warning: 'default',
  success: 'default',
  brand: 'default',
} as const;

const customVariantStyles = new Set<keyof typeof variantMap>(['warning', 'success', 'brand']);

export type ButtonProps = Omit<ShadcnButtonProps, 'size' | 'variant'> &
  VariantProps<typeof buttonVariants> & {
    size?: 'sm' | 'md' | 'lg';
    variant?:
      | 'default'
      | 'secondary'
      | 'outline'
      | 'ghost'
      | 'destructive'
      | 'warning'
      | 'success'
      | 'brand';
  };

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'default', size = 'md', ...props }, ref) => {
    const resolvedVariant = variant ?? 'default';
    const shadcnVariant: ShadcnButtonProps['variant'] = variantMap[resolvedVariant];
    const shadcnSize = sizeMap[size];
    const customVariantClass = customVariantStyles.has(resolvedVariant)
      ? buttonVariants({ variant: resolvedVariant })
      : '';

    return (
      <ShadcnButton
        ref={ref}
        variant={shadcnVariant}
        size={shadcnSize}
        className={cn(customVariantClass, className)}
        {...props}
      />
    );
  },
);
Button.displayName = 'Button';

export { buttonVariants };
