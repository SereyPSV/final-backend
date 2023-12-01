import styled from 'styled-components';

const H3Container = ({ children, className }) => (
	<h3 className={className}>{children}</h3>
);

export const H3 = styled(H3Container)`
	margin: 0px 0;

	& > span {
		color: #fcc82a;
	}
`;
