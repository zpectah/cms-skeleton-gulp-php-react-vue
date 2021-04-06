import { PIXEL_COEFFICIENT, BREAKPOINTS } from '../constants';

// Media query scope for styled-components
export const mediaScope = (
	media: { min?: number; max?: number },
	prefix: string = '@media only screen and',
	unit: string = 'px',
) => {
	let r: string = '';

	if (media.min && media.max) {
		r = `${prefix} (min-width: ${media.min}${unit}) and (max-width: ${media.max}${unit})`;
	} else if (media.min && !media.max) {
		r = `${prefix} (min-width: ${media.min}${unit})`;
	} else if (!media.min && media.max) {
		r = `${prefix} (max-width: ${media.max}${unit})`;
	}

	return r;
};

// Min-width prefix
export const minWidth = {
	sm: mediaScope({ min: BREAKPOINTS.sm }),
	md: mediaScope({ min: BREAKPOINTS.md }),
	lg: mediaScope({ min: BREAKPOINTS.lg }),
	xl: mediaScope({ min: BREAKPOINTS.xl }),
	xxl: mediaScope({ min: BREAKPOINTS.xxl }),
};

// Max-width prefix
export const maxWidth = {
	sm: mediaScope({ max: BREAKPOINTS.sm - PIXEL_COEFFICIENT }),
	md: mediaScope({ max: BREAKPOINTS.md - PIXEL_COEFFICIENT }),
	lg: mediaScope({ max: BREAKPOINTS.lg - PIXEL_COEFFICIENT }),
	xl: mediaScope({ max: BREAKPOINTS.xl - PIXEL_COEFFICIENT }),
	xxl: mediaScope({ max: BREAKPOINTS.xxl - PIXEL_COEFFICIENT }),
};

// Single breakpoint prefix
export const onlyBreakpoint = {
	xs: mediaScope({
		min: BREAKPOINTS.xs,
		max: BREAKPOINTS.sm - PIXEL_COEFFICIENT,
	}),
	sm: mediaScope({
		min: BREAKPOINTS.sm,
		max: BREAKPOINTS.md - PIXEL_COEFFICIENT,
	}),
	md: mediaScope({
		min: BREAKPOINTS.md,
		max: BREAKPOINTS.lg - PIXEL_COEFFICIENT,
	}),
	lg: mediaScope({
		min: BREAKPOINTS.lg,
		max: BREAKPOINTS.xl - PIXEL_COEFFICIENT,
	}),
	xl: mediaScope({
		min: BREAKPOINTS.xl,
		max: BREAKPOINTS.xxl - PIXEL_COEFFICIENT,
	}),
	xxl: mediaScope({
		min: BREAKPOINTS.xxl,
	}),
};
