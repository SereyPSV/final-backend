import { Icon } from '../../components';
import { styled } from 'styled-components';

const CounterContainer = ({ className, basketCounter, setBasketCounter }) => {
	return (
		<div className={className}>
			<div className="into-basket">
				<div className="counter-icon-minus">
					<Icon
						size={'16px'}
						margin={'0 10px 0 10px'}
						id="fa-minus"
						onClick={() => {
							basketCounter < 1
								? (basketCounter = 1)
								: setBasketCounter(basketCounter - 1);
						}}
					/>
				</div>
				<div className="counter-value">{basketCounter}</div>
				<div className="counter-icon-plus">
					<Icon
						size={'16px'}
						margin={'0 10px 0 10px'}
						id="fa-plus"
						onClick={() => {
							setBasketCounter(basketCounter + 1);
						}}
					/>
				</div>
			</div>
		</div>
	);
};

export const Counter = styled(CounterContainer)`
	display: flex;
	align-items: center;
	font-size: 30px;

	& .into-basket {
		display: flex;
		align-items: center;
		font-size: 24px;
		border: 1px solid #ccc;
	}

	& .counter-value {
		width: 40px;
		text-align: center;
	}
`;
