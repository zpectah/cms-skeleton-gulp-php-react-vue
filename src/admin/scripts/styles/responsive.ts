import { PIXEL_COEFFICIENT, BREAKPOINTS } from '../constants';

export const mediaPrefix = (
	media: { min?: number; max?: number },
	prefix: string = '@media only screen and',
	unit: string = 'px',
) => {
	let r: string = '';

	if (media.min && media.max) {
		r = `${prefix} (min-width: ${media.min}${unit}) and (max-width: ${
			media.max - PIXEL_COEFFICIENT
		}${unit})`;
	} else if (media.min && !media.max) {
		r = `${prefix} (min-width: ${media.min}${unit})`;
	} else if (!media.min && media.max) {
		r = `${prefix} (max-width: ${media.max - PIXEL_COEFFICIENT}${unit})`;
	}

	return r;
};

const media = {
	min: {
		sm: mediaPrefix({ min: BREAKPOINTS.sm }),
		md: mediaPrefix({ min: BREAKPOINTS.md }),
		lg: mediaPrefix({ min: BREAKPOINTS.lg }),
		xl: mediaPrefix({ min: BREAKPOINTS.xl }),
		xxl: mediaPrefix({ min: BREAKPOINTS.xxl }),
	},
	max: {
		sm: mediaPrefix({ max: BREAKPOINTS.sm }),
		md: mediaPrefix({ max: BREAKPOINTS.md }),
		lg: mediaPrefix({ max: BREAKPOINTS.lg }),
		xl: mediaPrefix({ max: BREAKPOINTS.xl }),
		xxl: mediaPrefix({ max: BREAKPOINTS.xxl }),
	},
	only: {
		xs: mediaPrefix({
			min: BREAKPOINTS.xs,
			max: BREAKPOINTS.sm,
		}),
		sm: mediaPrefix({
			min: BREAKPOINTS.sm,
			max: BREAKPOINTS.md,
		}),
		md: mediaPrefix({
			min: BREAKPOINTS.md,
			max: BREAKPOINTS.lg,
		}),
		lg: mediaPrefix({
			min: BREAKPOINTS.lg,
			max: BREAKPOINTS.xl,
		}),
		xl: mediaPrefix({
			min: BREAKPOINTS.xl,
			max: BREAKPOINTS.xxl,
		}),
		xxl: mediaPrefix({
			min: BREAKPOINTS.xxl,
		}),
	},
	between: {
		xs: {
			md: mediaPrefix({
				min: BREAKPOINTS.xs,
				max: BREAKPOINTS.md,
			}),
			lg: mediaPrefix({
				min: BREAKPOINTS.xs,
				max: BREAKPOINTS.lg,
			}),
			xl: mediaPrefix({
				min: BREAKPOINTS.xs,
				max: BREAKPOINTS.xl,
			}),
			xxl: mediaPrefix({
				min: BREAKPOINTS.xs,
				max: BREAKPOINTS.xxl,
			}),
		},
		sm: {
			lg: mediaPrefix({
				min: BREAKPOINTS.sm,
				max: BREAKPOINTS.lg,
			}),
			xl: mediaPrefix({
				min: BREAKPOINTS.sm,
				max: BREAKPOINTS.xl,
			}),
			xxl: mediaPrefix({
				min: BREAKPOINTS.sm,
				max: BREAKPOINTS.xxl,
			}),
		},
		md: {
			xl: mediaPrefix({
				min: BREAKPOINTS.md,
				max: BREAKPOINTS.xl,
			}),
			xxl: mediaPrefix({
				min: BREAKPOINTS.md,
				max: BREAKPOINTS.xxl,
			}),
		},
		lg: {
			xxl: mediaPrefix({
				min: BREAKPOINTS.lg,
				max: BREAKPOINTS.xxl,
			}),
		},
	},
};

export default media;
