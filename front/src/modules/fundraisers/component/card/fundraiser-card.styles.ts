import { css } from "@emotion/react";
import {
  colors,
  JosefinSans,
  Orbitron,
  radius,
  sizes,
  spaces,
  weights,
} from "../../../../common/styles";
import { Theme } from "../../../../common/types";
import { FundraiserStatusValueToString } from "../../../../common/types/fundraiser-status.type";

export const container = (theme: Theme) => css`
  display: flex;
  flex-direction: column;
  border-radius: ${radius[1]};
  border: 5px ${theme.colors.secondary} solid;
`;
export const upperBody = (theme: Theme) => css`
  display: flex;
  border-bottom: ${spaces[1]} ${theme.colors.secondary} solid;
`;
export const imageContainer = css`
  flex: 1;
  height: 250px;
`;
export const imageStyles = (theme: Theme) => css`
  max-width: 100%;
  height: 100%;
  object-fit: cover;
  border-bottom-right-radius: ${radius[6]};
  border-right: 5px ${theme.colors.secondary} solid;
  border-bottom: 5px ${theme.colors.secondary} solid;
`;
export const titleContainer = css`
  flex: 1;
  margin: ${spaces[2]} ${spaces[2]};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
`;
export const titleStyles = (theme: Theme) => css`
  ${Orbitron}
  color: ${theme.colors.secondary};
  margin: 0 ${spaces[1]};
`;
export const titleSpacer = css`
  width: 25%;
`;
export const descriptionStyles = (theme: Theme) => css`
  ${JosefinSans}
  color: ${theme.colors.secondary};
  margin: ${spaces[1]};
  font-weight: ${weights.normal};
  font-size: ${sizes.m};
`;
export const statusText = (theme: Theme, status: string) => {
  let color;
  if (status === FundraiserStatusValueToString[0]) color = theme.colors.secondary;
  else if (status === FundraiserStatusValueToString[1]) color = colors.green;
  else if (status === FundraiserStatusValueToString[2]) color = colors.red;
  else if (status === FundraiserStatusValueToString[3]) color = colors.blue;
  return css`
    color: ${color};
  `;
};
export const lowerBody = css`
  display: grid;
  grid-template-columns: 30% 40% 30%;
  justify-content: space-between;
  margin-top: auto;
`;
export const moreContainer = css`
  margin-top: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: ${spaces[1]};
`;
export const moreLink = (theme: Theme) => css`
  ${Orbitron}
  color: ${theme.colors.secondary};
`;
