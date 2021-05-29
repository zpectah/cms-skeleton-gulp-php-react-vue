import React from 'react';

import Map from '../Map';

interface LocationManagerProps {
	value: any;
	onChange: (value: any) => void;
}

const LocationManager: React.FC<LocationManagerProps> = ({
	value,
	onChange,
}) => {
	return (
		<>
			<Map />
			<br />
			<br />
			<input
				type="text"
				value={value}
				onChange={(e) => onChange(e.target.value)}
			/>
			<br />
		</>
	);
};

export default LocationManager;
