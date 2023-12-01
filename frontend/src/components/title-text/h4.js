import styled from 'styled-components';

const H4Container = ({ children, className }) => (
	<h4 className={className}>{children}</h4>
);

export const H4 = styled(H4Container)`
	margin: 0px 0;

	& > span {
		color: #fcc82a;
	}
`;
