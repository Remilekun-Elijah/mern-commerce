import React from "react";
import styled, { ThemeProvider } from "styled-components";

const theme = {
	primary: {
		backgroundColor: "#45accb",
		color: "white",
		border: "none",
		hover: {
			backgroundColor: "#45accb",
			color: "white",
		},
		disabled: {
			backgroundColor: "grey",
			color: "white",
		},
	},
	dark:{
		backgroundColor: "var(--bs-dark)",
		color: "var(--bs-white)",
		border: "none",
		hover: {
			backgroundColor: "var(--bs-gray-dark)",
			color: "var(--bs-white)",
		},
		disabled: {
			backgroundColor: "var(--bs-gray)",
			color: "var(--bs-white)",
			border: 'none'
		},
	
},
	danger:{
			backgroundColor: "var(--C_border_danger)",
			color: "var(--C_white)",
			border: "none",
			hover: {
				backgroundColor: "var(--C_danger)",
				color: "var(--C_white)",
			},
			disabled: {
				backgroundColor: "var(--C_danger)",
				color: "var(--C_white)",
				border: 'none'
			},
	},
	secondary: {
		backgroundColor: "var(--C_white)",
		border: "1px solid var(--C_primary)",
		color: "var(--C_primary)",
		hover: {
			backgroundColor: "var(--C_primary)",
			color: "var(--C_white) !important",
		},
		disabled: {
			backgroundColor: "var(--C_black_lite)",
			color: "var(--C_white)",
			border: 'none'
		},
	},
};

const SButton = styled.button`
		color: ${({ theme }) => theme.color};
		transition: all 0.3s ease-in-out;
		&:disabled {
			background-color: ${({ theme }) => theme.disabled.backgroundColor};
			color: ${({ theme }) => theme.disabled.color};
			border: ${({ theme }) => theme.disabled.border}
		}
		&:hover {
			color: ${({ theme }) => theme.hover.color};
			transition: all 0.3s ease-in-out;
			&:focus {
				outline: none;
			}
			&:disabled {
				background-color: ${({ theme }) => theme.disabled.backgroundColor};
				color: ${({ theme }) => theme.disabled.color};
				border: ${({ theme }) => theme.disabled.border};
			}
	`,
	Wrapper = styled.div`
		background-color: ${({ theme }) => theme.backgroundColor};
		color: ${({ theme }) => theme.color};
		border: ${({ theme }) => theme.border};
		transition: all 0.3s ease-in-out;
		&:hover {
			background-color: ${({ theme }) => theme.hover.backgroundColor};
			color: ${({ theme }) => theme.hover.color};
			transition: all 0.3s ease-in-out;
		}
	`;

const Button = ({
	id,
	icon,
	value,
	onClick,
	type,
	btnClass,
	wrapperClass,
	disabled,
	color,
	variant,
	width,
	parentClass,
}) => {
	return (
		<ThemeProvider theme={theme[variant || "primary"]}>
			<div className={`${parentClass||''} custom-button`}>
				<Wrapper
					className={`flex items-center cursor-pointer rounded-md btn_wrapper p-0 ${wrapperClass} w-full`}
					style={{ color, maxWidth: width }}
					disabled={disabled}
					onClick={onClick}>
					{icon && icon}
					<SButton
						className={`w-full  -10 rounded-md leading-tight focus:outline-none focus:shadow-outline text-white text-xl ${btnClass && btnClass.includes('py') ? btnClass : "py-3 "+btnClass}`}
						type={type || "button"}
						id={id}
						disabled={disabled}
						style={{ color }}>
						{value}
					</SButton>
				</Wrapper>
			</div>
		</ThemeProvider>
	);
};
export default Button;