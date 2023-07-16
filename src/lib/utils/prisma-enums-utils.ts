import type { ImgContent } from '@prisma/client';

/*
    Can't import prisma enums to browser!
    https://github.com/prisma/prisma/issues/12504
*/

export const ImgContentAppEnum: Record<ImgContent, ImgContent> = {
	PHOTO: 'PHOTO',
	PLAN: 'PLAN',
	ELEVATION: 'ELEVATION',
	SECTION: 'SECTION',
	AXONOMETRY: 'AXONOMETRY',
	RENDER: 'RENDER',
	COLLAGE: 'COLLAGE',
	SKETCH: 'SKETCH',
	MODEL: 'MODEL',
	OTHER: 'OTHER'
};
