import React from 'react';

const Spinner = (centered = false) => {
	const spinner = (
		<svg className='spinner' width='65px' height='65px' viewBox='0 0 66 66' xmlns='http://www.w3.org/2000/svg'>
			<circle className='path' fill='none' strokeWidth='6' strokeLinecap='round' cx='33' cy='33' r='30'></circle>
		</svg>
	);

	if (centered) {
		return (
			<div className='align-horizontal--center'>
				{spinner}
			</div>
		);
	}

	return spinner;
};

export default Spinner;
