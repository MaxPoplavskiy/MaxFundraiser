import { css } from "@emotion/react";
import { CSSProperties } from "react";
import {
  colors,
  JosefinSans,
  Orbitron,
  sizes,
  spaces,
  weights,
} from "../../common/styles";
import { Theme } from "../../common/types";
import { FundraiserStatusValue } from "../../common/types/fundraiser-status.type";

export const container = css`
  display: flex;
  margin-top: 4rem;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;
export const fundraiserGrid = css`
  display: grid;
  width: 70%;
  grid-template-columns: 4fr 1fr 15fr;
  gap: 20px;
`;
export const imageContainer = css`
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const image = (theme: Theme) => css`
  width: 100%;
  border-radius: 10px;
  border: 3px ${theme.colors.secondary} solid;
  box-sizing: border-box;
`;
export const title = (theme: Theme) => css`
  ${Orbitron}
  color: ${theme.colors.secondary};
`;
export const text = (theme: Theme) => css`
  color: ${theme.colors.secondary};
`;
export const statusText = (theme: Theme, status: FundraiserStatusValue) => {
  let color;
  if (status === FundraiserStatusValue.PENDING) color = theme.colors.secondary;
  else if (status === FundraiserStatusValue.APPROVED) color = colors.green;
  else if (status === FundraiserStatusValue.DECLINED) color = colors.red;
  else if (status === FundraiserStatusValue.FINISHED) color = colors.blue;
  return css`
    color: ${color};
  `;
};
export const description = (theme: Theme) => css`
  ${JosefinSans}
  font-size: 1.4rem;
  font-weight: ${weights.light};
  color: ${theme.colors.secondary};
`;
export const bottomContainer = css`
  display: grid;
  grid-column: span 3;
  grid-template-columns: min-content 13fr 1fr 1fr 1fr;
  justify-content: space-between;
  align-items: center;
`;
export const upvoteContainer = css`
  display: flex;
  align-items: center;
  min-width: 75px;

  h3 {
    font-size: ${sizes.xxl};
  }
`;
export const upvoteArrow = (theme: Theme, isVoted: boolean) => css`
  color: ${isVoted ? colors.green : theme.colors.secondary};
  * {
    transition: color 0.1s ease;
  }
`;
export const infoText = (theme: Theme) => css`
  ${Orbitron}
  color: ${theme.colors.secondary};
  font-size: 1rem;
  margin: 0;
`;
export const certificateButton = css`
  margin: 0 ${spaces[2]};
`
export const bottomSpacer = css`
  grid-column: span 3;
`;
export const sectionSelectionContainer = css`
  width: 70%;
`;
export const sectionSelection = css`
  display: flex;
  justify-content: space-around;
`;
export const sectionSelectionText = (theme: Theme, isSelect: boolean) => css`
  font-weight: ${isSelect ? weights.bold : weights.light};
  color: ${theme.colors.secondary};
`;
export const bottomDonationContainer = css`
  width: 70%;
  margin-bottom: 15px;
`;
export const buttonDonateContainer = css`
  display: flex;
  margin-top: ${spaces[3]};
  gap: ${spaces[5]};
`;
export const buttonDonateLeftContainer = css`
  width: 185px;
  display: flex;
  flex-direction: column;
  gap: ${spaces[2]};
`;
export const buttonModerationContainer = css`
  display: flex;
  flex-direction: column;
  gap: ${spaces[3]};
  margin-top: ${spaces[3]};
  width: 70%;
`;
export const declineModerationContainer = css`
  display: flex;
  gap: ${spaces[2]};
`;
export const declineReasonContainer = css`
  width: 70%;
  font-size: ${sizes.xxl};
  p {
    ${Orbitron}
  }
`;
export const dialog: CSSProperties = {
  width: `calc(${sizes.a4PreviewWidth} + 100px)`,
  height: `${sizes.a4PreviewWHeight}`
};
export const certificateDownloadButton = css`
  background-color: ${colors.black} !important;
  color: ${colors.white};
`