import styled from 'styled-components';

const LoaderContainer = ({ className }) => {
	return (
		<div className={className}>
			<div className="loadingio-spinner-spin-u3g2p6jqc2">
				<div className="ldio-zj73ah1ogw">
					<div>
						<div></div>
					</div>
					<div>
						<div></div>
					</div>
					<div>
						<div></div>
					</div>
					<div>
						<div></div>
					</div>
					<div>
						<div></div>
					</div>
					<div>
						<div></div>
					</div>
					<div>
						<div></div>
					</div>
					<div>
						<div></div>
					</div>
					<div>
						<div></div>
					</div>
					<div>
						<div></div>
					</div>
				</div>
			</div>
		</div>
	);
};

export const Loader = styled(LoaderContainer)`
	width: 1440px;
	display: flex;
	justify-content: center;

	@keyframes ldio-zj73ah1ogw {
		0% {
			opacity: 1;
			backface-visibility: hidden;
			transform: translateZ(0) scale(1.5, 1.5);
		}
		100% {
			opacity: 0;
			backface-visibility: hidden;
			transform: translateZ(0) scale(1, 1);
		}
	}
	.ldio-zj73ah1ogw div > div {
		position: absolute;
		width: 4px;
		height: 4px;
		border-radius: 50%;
		background: #fcc82a;
		animation: ldio-zj73ah1ogw 1s linear infinite;
	}
	.ldio-zj73ah1ogw div:nth-child(1) > div {
		left: 112px;
		top: 98px;
		animation-delay: -0.9s;
	}
	.ldio-zj73ah1ogw > div:nth-child(1) {
		transform: rotate(0deg);
		transform-origin: 114px 100px;
	}
	.ldio-zj73ah1ogw div:nth-child(2) > div {
		left: 109px;
		top: 106px;
		animation-delay: -0.8s;
	}
	.ldio-zj73ah1ogw > div:nth-child(2) {
		transform: rotate(36deg);
		transform-origin: 111px 108px;
	}
	.ldio-zj73ah1ogw div:nth-child(3) > div {
		left: 102px;
		top: 111px;
		animation-delay: -0.7s;
	}
	.ldio-zj73ah1ogw > div:nth-child(3) {
		transform: rotate(72deg);
		transform-origin: 104px 113px;
	}
	.ldio-zj73ah1ogw div:nth-child(4) > div {
		left: 94px;
		top: 111px;
		animation-delay: -0.6s;
	}
	.ldio-zj73ah1ogw > div:nth-child(4) {
		transform: rotate(108deg);
		transform-origin: 96px 113px;
	}
	.ldio-zj73ah1ogw div:nth-child(5) > div {
		left: 87px;
		top: 106px;
		animation-delay: -0.5s;
	}
	.ldio-zj73ah1ogw > div:nth-child(5) {
		transform: rotate(144deg);
		transform-origin: 89px 108px;
	}
	.ldio-zj73ah1ogw div:nth-child(6) > div {
		left: 84px;
		top: 98px;
		animation-delay: -0.4s;
	}
	.ldio-zj73ah1ogw > div:nth-child(6) {
		transform: rotate(180deg);
		transform-origin: 86px 100px;
	}
	.ldio-zj73ah1ogw div:nth-child(7) > div {
		left: 87px;
		top: 90px;
		animation-delay: -0.3s;
	}
	.ldio-zj73ah1ogw > div:nth-child(7) {
		transform: rotate(216deg);
		transform-origin: 89px 92px;
	}
	.ldio-zj73ah1ogw div:nth-child(8) > div {
		left: 94px;
		top: 85px;
		animation-delay: -0.2s;
	}
	.ldio-zj73ah1ogw > div:nth-child(8) {
		transform: rotate(252deg);
		transform-origin: 96px 87px;
	}
	.ldio-zj73ah1ogw div:nth-child(9) > div {
		left: 102px;
		top: 85px;
		animation-delay: -0.1s;
	}
	.ldio-zj73ah1ogw > div:nth-child(9) {
		transform: rotate(288deg);
		transform-origin: 104px 87px;
	}
	.ldio-zj73ah1ogw div:nth-child(10) > div {
		left: 109px;
		top: 90px;
		animation-delay: 0s;
	}
	.ldio-zj73ah1ogw > div:nth-child(10) {
		transform: rotate(324deg);
		transform-origin: 111px 92px;
	}
	.loadingio-spinner-spin-u3g2p6jqc2 {
		width: 200px;
		height: 200px;
		display: inline-block;
		overflow: hidden;
		background: rgba(255, 255, 255, 0);
	}
	.ldio-zj73ah1ogw {
		width: 100%;
		height: 100%;
		position: relative;
		transform: translateZ(0) scale(1);
		backface-visibility: hidden;
		transform-origin: 0 0; /* see note above */
	}
	.ldio-zj73ah1ogw div {
		box-sizing: content-box;
	}
`;
