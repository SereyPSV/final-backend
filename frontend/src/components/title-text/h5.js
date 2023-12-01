import styled from 'styled-components';

const H5Container = ({ children, className }) => (
	<h5 className={className}>{children}</h5>
);

export const H5 = styled(H5Container)`
	margin: 0px 0;

	& > span {
		color: #fcc82a;
	}
`;
